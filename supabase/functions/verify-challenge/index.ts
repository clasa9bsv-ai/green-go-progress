import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64, challengeTitle, challengeDescription, textAnswer, challengeId } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }
    
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Supabase credentials not configured');
    }

    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // If text answer provided, verify against protected table
    if (textAnswer && challengeId) {
      console.log('Verifying text answer for challenge:', challengeId);
      
      const { data: verification, error } = await supabaseAdmin
        .from('challenge_verification')
        .select('verification_answer')
        .eq('challenge_id', challengeId)
        .single();

      if (error) {
        console.error('Error fetching verification data:', error);
        throw new Error('Verification data not found');
      }

      const correctAnswer = verification.verification_answer?.toLowerCase() || '';
      const userAnswer = textAnswer.toLowerCase();
      const verified = userAnswer.includes(correctAnswer);

      console.log('Text verification result:', verified);

      return new Response(
        JSON.stringify({ verified, message: verified ? 'Răspuns corect!' : 'Răspuns incorect' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Verifying challenge with AI:', challengeTitle);

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: 'Ești un asistent AI care verifică dacă fotografiile trimise de utilizatori corespund cu provocările sustenabile. Răspunde doar cu "DA" dacă fotografia corespunde provocării sau "NU" dacă nu corespunde. Fii generos în evaluare - dacă fotografia arată un efort rezonabil, acceptă-o.'
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Provocare: ${challengeTitle}\nDescriere: ${challengeDescription}\n\nVerifică dacă această fotografie corespunde provocării. Răspunde doar cu DA sau NU.`
              },
              {
                type: 'image_url',
                image_url: {
                  url: imageBase64
                }
              }
            ]
          }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit depășit. Te rugăm să încerci din nou mai târziu.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Credite insuficiente. Contactează administratorul.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      throw new Error('AI verification failed');
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content?.trim().toUpperCase();
    
    console.log('AI Response:', aiResponse);
    
    const verified = aiResponse === 'DA';

    return new Response(
      JSON.stringify({ verified, message: aiResponse }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in verify-challenge:', error);
    const errorMessage = error instanceof Error ? error.message : 'Eroare la verificarea provocării';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});