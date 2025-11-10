-- Update rewards table to show rewards at levels 10, 20, 30, 40, 50
DELETE FROM public.rewards;

INSERT INTO public.rewards (level, title, description, company, value, icon)
VALUES 
  (10, 'Voucher Altex 50 RON', 'Discount de 50 RON pentru produse eco-friendly', 'Altex', '50 RON', '🎁'),
  (20, 'Voucher eMAG 100 RON', 'Voucher pentru produse eco și articole reutilizabile', 'eMAG', '100 RON', '🎁'),
  (30, 'Voucher Decathlon 150 RON', 'Discount pentru echipament sport și outdoor sustenabil', 'Decathlon', '150 RON', '🎁'),
  (40, 'Voucher Carrefour 200 RON', 'Voucher pentru produse bio și eco-friendly', 'Carrefour', '200 RON', '🎁'),
  (50, 'Voucher IKEA 300 RON', 'Discount pentru mobilier și produse sustenabile', 'IKEA', '300 RON', '🎁'),
  (60, 'Voucher Mega Image 250 RON', 'Voucher pentru produse organice și locale', 'Mega Image', '250 RON', '🎁'),
  (70, 'Voucher Lidl 300 RON', 'Discount pentru produse eco-friendly', 'Lidl', '300 RON', '🎁'),
  (80, 'Voucher Hervis 350 RON', 'Discount pentru echipament outdoor sustenabil', 'Hervis', '350 RON', '🎁'),
  (90, 'Voucher Kaufland 400 RON', 'Voucher pentru produse bio și sustenabile', 'Kaufland', '400 RON', '🎁'),
  (100, 'Voucher Premium 500 RON', 'Voucher special pentru orice magazin partner eco-friendly!', 'Premium', '500 RON', '🏆');