import { useState, useRef, useEffect } from "react";

// ─────────────────────────────────────────────────────────────────────────────
//  EXPANDED CARD DATABASE (35+ Indian Credit Cards)
// ─────────────────────────────────────────────────────────────────────────────
const CARD_DB = {
  // ═══ HDFC BANK ═══
  "hdfc-infinia":   { id:"hdfc-infinia",   name:"Infinia Metal",        bank:"HDFC Bank",            network:"Visa Infinite", gradient:["#1C1033","#0B0620"], accent:"#C9A84C", fee:"₹12,500/yr", ltf:false, type:"Super Premium", emoji:"👑", benefits:{amazon:3.3,flipkart:3.3,online:3.3,travel:5,dining:3.3,fuel:1,default:3.3}, tags:["lounge-dom","lounge-intl","zero-forex","miles","dining","golf","insurance","concierge"], perks:["5 RP/₹150 (~3.3% value)","Unlimited Priority Pass worldwide","Club Marriott membership","Zero forex markup","Golf at 100+ courses","24/7 luxury concierge","1:1 miles to airlines","₹3 Cr travel & purchase insurance"], url:"https://www.hdfcbank.com/personal/pay/cards/credit-cards/infinia-metal-credit-card", annualFee:12500 },
  "hdfc-regalia":   { id:"hdfc-regalia",   name:"Regalia Gold",         bank:"HDFC Bank",            network:"Visa",          gradient:["#1E0B4B","#100630"], accent:"#9C27B0", fee:"₹2,500/yr",  ltf:false, type:"Premium",       emoji:"💜", benefits:{amazon:2,flipkart:2,online:2,travel:5,dining:5,fuel:1,default:2},       tags:["lounge-dom","lounge-intl","dining","insurance","miles"],                         perks:["4 RP/₹150 (~2% value)","5X on dining & travel (SmartBuy)","12 domestic lounge/yr","2 intl lounge/yr","₹1 Cr travel insurance","Golf 2x/month"], url:"https://www.hdfcbank.com/personal/pay/cards/credit-cards/regalia-gold-credit-card", annualFee:2500 },
  "hdfc-millennia": { id:"hdfc-millennia", name:"Millennia",            bank:"HDFC Bank",            network:"Visa",          gradient:["#0C2340","#071526"], accent:"#4FC3F7", fee:"₹1,000/yr",  ltf:false, type:"Cashback",      emoji:"💳", benefits:{amazon:5,flipkart:5,online:5,travel:1,dining:5,fuel:1,default:1},         tags:["cashback","shopping","lounge-dom","movies"],                                    perks:["5% on Amazon, Flipkart, Myntra, Nykaa","5% on Swiggy, Zomato, BookMyShow, cult.fit","Cap ₹1,000/cycle","4 domestic lounge/yr","Welcome vouchers ₹1,000"], url:"https://www.hdfcbank.com/personal/pay/cards/credit-cards/millennia-credit-card", annualFee:1000 },
  "hdfc-swiggy":    { id:"hdfc-swiggy",    name:"Swiggy Card",          bank:"HDFC Bank",            network:"Visa",          gradient:["#1F0A00","#3E1A00"], accent:"#FF5700", fee:"₹500/yr",    ltf:false, type:"Co-branded",    emoji:"🍔", benefits:{amazon:1,flipkart:1,online:2,travel:1,dining:10,fuel:1,default:1},        tags:["cashback","dining"],                                                            perks:["10% cashback on Swiggy (Food, Instamart, Dineout, Genie)","2% all other online","1% offline","Complimentary Swiggy One membership","3 domestic lounge/quarter"], url:"https://www.hdfcbank.com/personal/pay/cards/credit-cards/swiggy-hdfc-bank-credit-card", annualFee:500 },
  
  // ═══ SBI CARD ═══
  "sbi-cashback":   { id:"sbi-cashback",   name:"Cashback Card",        bank:"SBI Card",             network:"Visa",          gradient:["#0D1B5E","#050D38"], accent:"#42A5F5", fee:"₹999/yr",    ltf:false, type:"Cashback",      emoji:"💰", benefits:{amazon:5,flipkart:5,online:5,travel:1,dining:1,fuel:1,default:1},         tags:["cashback","shopping","lounge-dom","fuel"],                                      perks:["5% on ALL online — unlimited, no cap","1% offline/wallet","Fuel surcharge waiver","4 domestic lounge/yr"], url:"https://www.sbicard.com/en/personal/credit-cards/cashback/cashback-sbi-card.page", annualFee:999 },
  "sbi-elite":      { id:"sbi-elite",      name:"ELITE",                bank:"SBI Card",             network:"Mastercard",    gradient:["#1A0A00","#2D1200"], accent:"#FF8F00", fee:"₹4,999/yr",  ltf:false, type:"Premium",       emoji:"🏆", benefits:{amazon:2,flipkart:2,online:2,travel:4,dining:4,fuel:1,default:2},        tags:["lounge-dom","lounge-intl","dining","movies","insurance","miles"],               perks:["Welcome e-vouchers ₹5,000 (Yatra/M&S)","5X on dining & grocery","10 domestic lounge/yr","6 intl lounge/yr (Priority Pass)","Buy 1 Get 1 BookMyShow 2x/month","₹1 Cr travel insurance"], url:"https://www.sbicard.com/en/personal/credit-cards/rewards/sbi-card-elite.page", annualFee:4999 },
  "sbi-irctc":      { id:"sbi-irctc",      name:"IRCTC SBI Premier",    bank:"SBI Card",             network:"Visa",          gradient:["#00264D","#00162B"], accent:"#29B6F6", fee:"₹1,499/yr",  ltf:false, type:"Co-branded",    emoji:"🚂", benefits:{amazon:1,flipkart:1,online:1,travel:10,dining:1,fuel:1,default:1},        tags:["miles","lounge-dom","insurance"],                                               perks:["10% value back on IRCTC AC tickets","4 railway lounge visits/quarter","1% surcharge waiver on IRCTC"], url:"https://www.sbicard.com/en/personal/credit-cards/travel-and-fuel/irctc-sbi-card-premier.page", annualFee:1499 },
  
  // ═══ ICICI BANK ═══
  "icici-amazon":   { id:"icici-amazon",   name:"Amazon Pay",           bank:"ICICI Bank",           network:"Visa",          gradient:["#0F0F0F","#1A200D"], accent:"#FF9900", fee:"Lifetime Free",ltf:true,  type:"Cashback",      emoji:"📦", benefits:{amazon:5,flipkart:2,online:2,travel:1,dining:1,fuel:1,default:1},         tags:["cashback","shopping","ltf"],                                                    perks:["5% cashback on Amazon (Prime members)","2% on Amazon Pay partners","Lifetime free — zero annual fee","Instant credit to Amazon Pay balance","No min transaction"], url:"https://www.icicibank.com/personal-banking/cards/credit-card/amazon-pay-credit-card", annualFee:0 },
  "icici-emeralde": { id:"icici-emeralde", name:"Emeralde Private Metal",bank:"ICICI Bank",           network:"Visa",          gradient:["#001A12","#002E1F"], accent:"#00C853", fee:"₹12,000/yr", ltf:false, type:"Super Premium", emoji:"💎", benefits:{amazon:3.5,flipkart:3.5,online:3.5,travel:5,dining:5,fuel:1,default:3.5}, tags:["lounge-dom","lounge-intl","zero-forex","dining","miles","golf","concierge","insurance"], perks:["Unlimited lounge (Priority Pass)","EazyDiner Prime + Taj Epicure","₹1,000 dining cashback/month","Zero forex markup","Golf privileges"], url:"https://www.icicibank.com/personal-banking/cards/credit-card/emeralde-private-metal-credit-card", annualFee:12000 },
  
  // ═══ AXIS BANK ═══
  "axis-atlas":     { id:"axis-atlas",     name:"Atlas",                bank:"Axis Bank",            network:"Visa",          gradient:["#0D0025","#1A003D"], accent:"#7C4DFF", fee:"₹5,000/yr",  ltf:false, type:"Travel",        emoji:"✈️", benefits:{amazon:2,flipkart:2,online:2,travel:10,dining:5,fuel:1,default:2},        tags:["miles","lounge-dom","lounge-intl","zero-forex","insurance","concierge"],        perks:["5 EDGE Miles/₹100 on travel","Unlimited domestic lounge","8 intl lounge/yr (DragonPass)","1:1 miles to 15+ airlines","Zero forex markup","₹3.5 Cr travel insurance"], url:"https://www.axisbank.com/retail/cards/credit-card/axis-bank-atlas-credit-card", annualFee:5000 },
  "axis-magnus":    { id:"axis-magnus",    name:"Magnus",               bank:"Axis Bank",            network:"Visa",          gradient:["#1A0A00","#2D1800"], accent:"#FF6D00", fee:"₹12,500/yr", ltf:false, type:"Super Premium", emoji:"🔥", benefits:{amazon:3,flipkart:3,online:3,travel:6,dining:6,fuel:1,default:3},         tags:["lounge-dom","lounge-intl","zero-forex","miles","dining","golf","movies","concierge","insurance"], perks:["Unlimited airport lounge worldwide","25% off at 3,000+ restaurants","EDGE Miles 1:1 to airlines","Zero forex markup","Golf 12 sessions/yr","Buy 1 Get 1 BookMyShow"], url:"https://www.axisbank.com/retail/cards/credit-card/axis-bank-magnus-credit-card", annualFee:12500 },
  "axis-flipkart":  { id:"axis-flipkart",  name:"Flipkart Axis",        bank:"Axis Bank",            network:"Visa",          gradient:["#0A1472","#060D50"], accent:"#F7971E", fee:"₹500/yr",    ltf:false, type:"Co-branded",    emoji:"🛍️", benefits:{amazon:1.5,flipkart:5,online:4,travel:1.5,dining:4,fuel:1,default:1.5},   tags:["cashback","shopping","lounge-dom"],                                             perks:["5% on Flipkart (unlimited)","4% on Swiggy, PVR, Uber, Cleartrip","1.5% on everything else (uncapped)","4 domestic lounge/yr"], url:"https://www.axisbank.com/retail/cards/credit-card/flipkart-axis-bank-credit-card", annualFee:500 },
  "axis-airtel":    { id:"axis-airtel",    name:"Airtel Axis",          bank:"Axis Bank",            network:"Visa",          gradient:["#CC0000","#880000"], accent:"#FF5252", fee:"₹500/yr",    ltf:false, type:"Co-branded",    emoji:"📡", benefits:{amazon:1,flipkart:1,online:2,travel:1,dining:2,fuel:1,default:1},         tags:["cashback","shopping"],                                                          perks:["25% cashback on Airtel recharges/broadband","10% on Swiggy, Zomato, BigBasket","1% all else","Airtel Thanks Premium upgrade","4 domestic lounge/yr"], url:"https://www.axisbank.com/retail/cards/credit-card/airtel-axis-bank-credit-card", annualFee:500 },
  
  // ═══ IDFC FIRST BANK ═══
  "idfc-select":    { id:"idfc-select",    name:"FIRST Select",         bank:"IDFC FIRST Bank",      network:"Visa",          gradient:["#002210","#001A0C"], accent:"#00E676", fee:"Lifetime Free",ltf:true,  type:"Rewards",       emoji:"🍀", benefits:{amazon:3,flipkart:3,online:3,travel:6,dining:10,fuel:1.5,default:2},     tags:["ltf","lounge-dom","zero-forex","dining","fuel","upi"],                          perks:["10X RP on dining & movies (~6% value)","Points never expire!","4 lounge visits/quarter (16/yr)","Zero forex markup","Lifetime free","RuPay UPI-linked option"], url:"https://www.idfcfirstbank.com/credit-card/first-select-credit-card", annualFee:0 },
  "idfc-wealth":    { id:"idfc-wealth",    name:"FIRST Wealth Metal",   bank:"IDFC FIRST Bank",      network:"Visa",          gradient:["#0A0800","#1A1200"], accent:"#D4A853", fee:"₹2,500/yr",  ltf:false, type:"Premium",       emoji:"🪙", benefits:{amazon:3.5,flipkart:3.5,online:3.5,travel:7,dining:10,fuel:2,default:3.5}, tags:["lounge-dom","lounge-intl","zero-forex","dining","golf","miles"],                perks:["10X RP on dining (~6%)","Unlimited domestic lounge","Zero forex markup","Never-expiring points","Golf 2 sessions/month","Premium metal card"], url:"https://www.idfcfirstbank.com/credit-card/first-wealth-credit-card", annualFee:2500 },
  
  // ═══ AMERICAN EXPRESS ═══
  "amex-platinum":  { id:"amex-platinum",  name:"Platinum Charge",      bank:"American Express",     network:"Amex",          gradient:["#1A1A00","#1A1500"], accent:"#FFDD00", fee:"₹60,000/yr", ltf:false, type:"Super Premium", emoji:"⚜️", benefits:{amazon:1,flipkart:1,online:1,travel:5,dining:5,fuel:1,default:1},         tags:["lounge-dom","lounge-intl","zero-forex","dining","golf","concierge","insurance","miles"], perks:["Centurion Lounge worldwide (unlimited)","Fine Hotels & Resorts upgrades","Taj InnerCircle Epicure Platinum","MR points 1:1 to 18 airlines","24/7 lifestyle managers"], url:"https://www.americanexpress.com/in/credit-cards/platinum-charge-card/", annualFee:60000 },
  "amex-gold":      { id:"amex-gold",      name:"Gold Card",            bank:"American Express",     network:"Amex",          gradient:["#2A1A00","#1A1000"], accent:"#FFD700", fee:"₹4,500/yr",  ltf:false, type:"Rewards",       emoji:"🥇", benefits:{amazon:2,flipkart:2,online:2,travel:3,dining:4,fuel:1,default:2},         tags:["dining","miles","lounge-dom","insurance"],                                      perks:["4X MR on dining","3X on travel","EazyDiner Prime membership","Year 1 fee waived","MR 1:1 to airlines"], url:"https://www.americanexpress.com/in/credit-cards/gold-card/", annualFee:4500 },
  
  // ═══ ONECARD ═══
  "onecard-metal":  { id:"onecard-metal",  name:"OneCard Metal",        bank:"OneCard (FPL Tech)",   network:"Visa",          gradient:["#101010","#1C1C1C"], accent:"#E0E0E0", fee:"Lifetime Free",ltf:true,  type:"Rewards",       emoji:"⬛", benefits:{amazon:5,flipkart:5,online:5,travel:2,dining:5,fuel:1,default:2},         tags:["ltf","cashback","zero-forex","shopping","dining"],                              perks:["5X on top 2 categories (auto-detected monthly)","Zero forex markup","Full metal card — lifetime free","Real-time tracking via OneCard app","EMI on demand"], url:"https://getonecard.app/", annualFee:0 },
  
  // ═══ FEDERAL BANK / SCAPIA ═══
  "federal-scapia": { id:"federal-scapia", name:"Scapia Travel",        bank:"Federal Bank / Scapia",network:"Visa",          gradient:["#001824","#001020"], accent:"#00BCD4", fee:"Lifetime Free",ltf:true,  type:"Travel",        emoji:"🌍", benefits:{amazon:10,flipkart:10,online:10,travel:20,dining:10,fuel:1,default:10},   tags:["ltf","zero-forex","miles","lounge-dom","cashback"],                             perks:["20% Scapia Coins on travel bookings via app","10% on all other eligible spends","Zero forex markup — best for intl trips","Unlimited domestic lounge","Lifetime free"], url:"https://www.scapia.app/", annualFee:0 },
  
  // ═══ STANDARD CHARTERED ═══
  "sc-ultimate":    { id:"sc-ultimate",    name:"Ultimate",             bank:"Standard Chartered",   network:"Visa",          gradient:["#001520","#002030"], accent:"#00A0E9", fee:"₹5,000/yr",  ltf:false, type:"Cashback",      emoji:"💠", benefits:{amazon:3.3,flipkart:3.3,online:3.3,travel:5,dining:3.3,fuel:1,default:3.3}, tags:["cashback","zero-forex","lounge-intl","lounge-dom","insurance"],                perks:["3.3% cashback on ALL spends — unlimited, no cap","Zero forex markup","Priority Pass 2 visits/month","₹1.5 Cr travel insurance","Statement credit redemption"], url:"https://www.sc.com/in/credit-cards/ultimate-credit-card/", annualFee:5000 },
  
  // ═══ RBL BANK ═══
  "rbl-insignia":   { id:"rbl-insignia",   name:"Insignia Amex",        bank:"RBL Bank",             network:"Amex",          gradient:["#002050","#001335"], accent:"#00BFFF", fee:"₹2,500/yr",  ltf:false, type:"Premium",       emoji:"💙", benefits:{amazon:1.5,flipkart:1.5,online:1.5,travel:3,dining:3,fuel:1.5,default:1.5}, tags:["lounge-dom","dining","insurance"],                                               perks:["5X Reward Multiplier Points (~3% value) on dining, spas, movies","4 domestic lounge/yr (Encalm/Plaza Premium)","Monthly movie tickets BOGO","₹10 Lakhs purchase protection"], url:"https://www.rblbank.com/credit-cards/insignia-amex-card", annualFee:2500 },
  
  // ═══ KOTAK MAHINDRA BANK ═══
  "kotak-white":    { id:"kotak-white",    name:"White Reserve",        bank:"Kotak Mahindra Bank",  network:"Mastercard",    gradient:["#1A1A1A","#0D0D0D"], accent:"#FFFFFF", fee:"₹10,000/yr", ltf:false, type:"Super Premium", emoji:"⚪", benefits:{amazon:3,flipkart:3,online:3,travel:6,dining:6,fuel:2,default:3},         tags:["lounge-dom","lounge-intl","zero-forex","dining","concierge","insurance"],       perks:["Unlimited domestic lounge (Dreamfolks)","6 international lounge/yr","Dedicated concierge","Zero forex markup","₹2 Cr travel insurance","Golf privileges","Club Marriott"], url:"https://www.kotak.com/en/personal-banking/cards/credit-cards/white-reserve-credit-card.html", annualFee:10000 },
  "kotak-league":   { id:"kotak-league",   name:"League Platinum",      bank:"Kotak Mahindra Bank",  network:"Mastercard",    gradient:["#0D1B2C","#071118"], accent:"#0099CC", fee:"₹1,999/yr",  ltf:false, type:"Premium",       emoji:"🏅", benefits:{amazon:2.5,flipkart:2.5,online:2.5,travel:5,dining:5,fuel:2,default:2.5}, tags:["lounge-dom","dining","fuel","movies"],                                            perks:["5X RP on dining, grocery, fuel","6 domestic lounge/yr","Movie ticket BOGO 4x/month","Fuel surcharge waiver","₹75K milestone benefit"], url:"https://www.kotak.com/en/personal-banking/cards/credit-cards/league-platinum-credit-card.html", annualFee:1999 },
  
  // ═══ NEW ADDITIONS: KIWI & YES BANK ═══
  "kiwi-rupay":     { id:"kiwi-rupay",     name:"Kiwi RuPay UPI",       bank:"Yes Bank / AU Bank",   network:"RuPay",         gradient:["#0F4C3A","#052D20"], accent:"#10B981", fee:"Lifetime Free",ltf:true,  type:"UPI Credit",    emoji:"🥝", benefits:{amazon:1.5,flipkart:1.5,online:1.5,travel:5,dining:2,fuel:1,default:1.5},  tags:["ltf","upi","cashback","zero-forex","lounge-dom"],                               perks:["1.5% base UPI cashback","5% with Kiwi Neon (₹999/yr)","Instant virtual issuance","UPI on Google Pay/PhonePe","Lounge on milestone","Direct bank account redemption"], url:"https://www.gokiwi.in/", annualFee:0 },
  "yes-elite-plus": { id:"yes-elite-plus", name:"ELITE+ Credit Card",   bank:"Yes Bank",             network:"Mastercard",    gradient:["#1A0D00","#0F0600"], accent:"#FF8C00", fee:"₹4,999/yr",  ltf:false, type:"Premium",       emoji:"⭐", benefits:{amazon:2,flipkart:2,online:3,travel:4,dining:4,fuel:1.5,default:2},      tags:["lounge-dom","lounge-intl","dining","movies","golf"],                            perks:["Accelerated points on online shopping","25% off BookMyShow tickets","Golf lessons & fee waiver","Priority Pass lounge access","MasterCard Secure transactions"], url:"https://www.yesbank.in/personal-banking/yes-first/cards/credit-card", annualFee:4999 },
  "yes-ace":        { id:"yes-ace",        name:"ACE Credit Card",      bank:"Yes Bank",             network:"Visa",          gradient:["#2E1065","#1A0B3D"], accent:"#8B5CF6", fee:"₹999/yr",    ltf:false, type:"Rewards",       emoji:"🎯", benefits:{amazon:2,flipkart:2,online:4,travel:2,dining:2,fuel:1,default:2},         tags:["online","shopping","fuel","insurance"],                                         perks:["8 RP/₹200 on online shopping","4 RP/₹200 on offline retail","2 RP/₹200 on utilities","Fuel surcharge waiver","Purchase protection ₹50K"], url:"https://www.yesbank.in/personal-banking/cards/ace-credit-card", annualFee:999 },
  "yes-byoc":       { id:"yes-byoc",       name:"Build Your Own Card",  bank:"Yes Bank",             network:"Visa",          gradient:["#4C1D95","#2E1065"], accent:"#A855F7", fee:"₹249-3499",  ltf:false, type:"Customizable",  emoji:"🎨", benefits:{amazon:1.5,flipkart:1.5,online:2,travel:2,dining:2,fuel:1,default:1.5},   tags:["customizable","shopping","dining","lounge-dom"],                                 perks:["10% cashback on BookMyShow/Swiggy/Uber","Customizable benefits & card design","Plastic/Eco-friendly/Metal options","1 lounge/quarter on ₹35K spend","25% off BookMyShow tickets"], url:"https://www.yesbank.in/personal-banking/cards/byoc-credit-card", annualFee:249 },
  
  // ═══ INDUSIND BANK ═══
  "indusind-legend": { id:"indusind-legend", name:"Legend",             bank:"IndusInd Bank",        network:"Visa",          gradient:["#0F172A","#020617"], accent:"#E2E8F0", fee:"Lifetime Free",ltf:true,  type:"Rewards",       emoji:"🗿", benefits:{amazon:1,flipkart:1,online:1,travel:2,dining:2,fuel:1.5,default:1},      tags:["ltf","movies","fuel","insurance"],                                              perks:["2X RP on weekends vs 1X weekdays","Buy 1 Get 1 BookMyShow tickets","1% fuel surcharge waiver","Zero forex markup 1.8%","Priority Pass membership","Points never expire"], url:"https://www.indusind.com/in/personal/cards/credit-card/legend.html", annualFee:0 },
  "indusind-easydiner": { id:"indusind-easydiner", name:"EazyDiner Signature", bank:"IndusInd Bank",  network:"Visa",          gradient:["#7C2D12","#451A03"], accent:"#FEA116", fee:"₹1,999/yr",  ltf:false, type:"Co-branded",    emoji:"🍽️", benefits:{amazon:1.5,flipkart:1.5,online:1.5,travel:3,dining:10,fuel:1,default:1.5}, tags:["dining","movies","travel"],                                                     perks:["10 RP/₹100 on dining & entertainment","EazyDiner Prime membership ₹2,495","25-50% instant discounts at 2000+ restaurants","₹5,000 Postcard Hotel voucher","2,000 bonus EazyPoints"], url:"https://www.indusind.com/in/personal/cards/credit-card/easydiner-signature.html", annualFee:1999 },
  "indusind-pinnacle": { id:"indusind-pinnacle", name:"Pinnacle",       bank:"IndusInd Bank",        network:"Visa",          gradient:["#064E3B","#022C22"], accent:"#059669", fee:"₹2,999/yr",  ltf:false, type:"Premium",       emoji:"⛰️", benefits:{amazon:3,flipkart:3,online:5,travel:5,dining:3,fuel:1.5,default:2},      tags:["online","travel","luxury","hotels"],                                            perks:["5X RP on online shopping & airlines","Luxury hotel vouchers","Golf 2 sessions/month","Premium lifestyle benefits","After first year - lifetime free on fee payment"], url:"https://www.indusind.com/in/personal/cards/credit-card/pinnacle.html", annualFee:2999 },
  
  // ═══ AU SMALL FINANCE BANK ═══
  "au-altura":      { id:"au-altura",      name:"Altura Plus",          bank:"AU Small Finance Bank",network:"Visa",          gradient:["#92400E","#451A03"], accent:"#F59E0B", fee:"₹2,999/yr",  ltf:false, type:"Rewards",       emoji:"🏔️", benefits:{amazon:2,flipkart:2,online:2,travel:4,dining:4,fuel:1.5,default:2},      tags:["lounge-dom","dining","fuel","insurance"],                                       perks:["4 domestic lounge/quarter","20 RP/₹100 on dining","10 RP/₹100 on grocery/intl","Fuel surcharge waiver","Air accident cover ₹50L"], url:"https://www.aubank.in/credit-card/altura-plus-credit-card", annualFee:2999 },
  "au-lit":         { id:"au-lit",         name:"LIT Credit Card",      bank:"AU Small Finance Bank",network:"Visa",          gradient:["#7C3AED","#4C1D95"], accent:"#A78BFA", fee:"Lifetime Free",ltf:true,  type:"Customizable",  emoji:"🔥", benefits:{amazon:2,flipkart:2,online:2,travel:3,dining:3,fuel:1,default:2},         tags:["ltf","customizable","lounge-dom","cashback"],                                   perks:["Choose benefits every 90 days","Up to 10X RP or 5% cashback","2 domestic lounge/quarter","Features from ₹49-₹3,999 quarterly","Lifetime free base card"], url:"https://www.aubank.in/credit-card/lit-credit-card", annualFee:0 },
  "au-zenith":      { id:"au-zenith",      name:"Zenith",               bank:"AU Small Finance Bank",network:"Visa",          gradient:["#1E1B4B","#0F0E3B"], accent:"#6366F1", fee:"₹5,999/yr",  ltf:false, type:"Super Premium", emoji:"💫", benefits:{amazon:3,flipkart:3,online:3,travel:6,dining:10,fuel:2,default:3},        tags:["lounge-dom","lounge-intl","dining","golf","insurance","concierge"],            perks:["10X RP on dining (~6% value)","Unlimited domestic lounge","Golf 2 sessions/month","₹1,000 brand vouchers","Premium concierge services"], url:"https://www.aubank.in/credit-card/zenith-credit-card", annualFee:5999 },
  
  // ═══ PUNJAB NATIONAL BANK ═══
  "pnb-rupay-select": { id:"pnb-rupay-select", name:"RuPay Select",     bank:"Punjab National Bank", network:"RuPay",         gradient:["#166534","#14532D"], accent:"#22C55E", fee:"₹1,999/yr",  ltf:false, type:"Rewards",       emoji:"🏦", benefits:{amazon:2,flipkart:2,online:2,travel:3,dining:3,fuel:1.5,default:2},      tags:["lounge-dom","upi","fuel","rewards"],                                            perks:["2 RP/₹150 on retail spends","Lounge access on milestone","Fuel surcharge waiver","UPI-enabled payments","PNB Rewardz program"], url:"https://www.pnb.co.in/credit-card-rupay-select.html", annualFee:1999 },
  "pnb-global":     { id:"pnb-global",     name:"PNB Global Card",      bank:"Punjab National Bank", network:"Visa",          gradient:["#0C4A6E","#0E7490"], accent:"#0EA5E9", fee:"₹999/yr",    ltf:false, type:"Basic",         emoji:"🌐", benefits:{amazon:1,flipkart:1,online:1,travel:2,dining:2,fuel:1,default:1},         tags:["global","basic","fuel"],                                                        perks:["1 RP/₹100 on all spends","Global acceptance","Fuel surcharge waiver","24/7 customer support","Zero lost card liability"], url:"https://www.pnb.co.in/credit-cards.html", annualFee:999 }
};

// ─────────────────────────────────────────────────────────────────────────────
//  EXPANDED AFFILIATE DATABASE
// ─────────────────────────────────────────────────────────────────────────────
const AFF = {
  "amex-platinum":      { commission: 8000,  network: "Direct",      url: "https://americanexpress.com/in/credit-cards/platinum-charge-card/?utm_source=cardo&utm_medium=affiliate" },
  "hdfc-infinia":       { commission: 4500,  network: "PaisaBazaar", url: "https://paisabazaar.com/hdfc-infinia-metal?utm_source=cardo&utm_medium=affiliate" },
  "axis-magnus":        { commission: 4000,  network: "PaisaBazaar", url: "https://paisabazaar.com/axis-magnus?utm_source=cardo&utm_medium=affiliate" },
  "icici-emeralde":     { commission: 4000,  network: "Direct",      url: "https://icicibank.com/emeralde-private-metal?utm_source=cardo&utm_medium=affiliate" },
  "kotak-white":        { commission: 3500,  network: "PaisaBazaar", url: "https://paisabazaar.com/kotak-white-reserve?utm_source=cardo&utm_medium=affiliate" },
  "au-zenith":          { commission: 3200,  network: "BankBazaar",  url: "https://bankbazaar.com/au-zenith?utm_source=cardo&utm_medium=affiliate" },
  "axis-atlas":         { commission: 3000,  network: "PaisaBazaar", url: "https://paisabazaar.com/axis-atlas?utm_source=cardo&utm_medium=affiliate" },
  "indusind-pinnacle":  { commission: 2800,  network: "BankBazaar",  url: "https://bankbazaar.com/indusind-pinnacle?utm_source=cardo&utm_medium=affiliate" },
  "au-altura":          { commission: 2700,  network: "BankBazaar",  url: "https://bankbazaar.com/au-altura-plus?utm_source=cardo&utm_medium=affiliate" },
  "yes-elite-plus":     { commission: 2600,  network: "PaisaBazaar", url: "https://paisabazaar.com/yes-elite-plus?utm_source=cardo&utm_medium=affiliate" },
  "amex-gold":          { commission: 2500,  network: "Direct",      url: "https://americanexpress.com/in/credit-cards/gold-card/?utm_source=cardo&utm_medium=affiliate" },
  "sbi-elite":          { commission: 2500,  network: "PaisaBazaar", url: "https://paisabazaar.com/sbi-elite?utm_source=cardo&utm_medium=affiliate" },
  "rbl-insignia":       { commission: 2400,  network: "BankBazaar",  url: "https://bankbazaar.com/rbl-insignia-amex?utm_source=cardo&utm_medium=affiliate" },
  "hdfc-regalia":       { commission: 2000,  network: "PaisaBazaar", url: "https://paisabazaar.com/hdfc-regalia-gold?utm_source=cardo&utm_medium=affiliate" },
  "indusind-easydiner": { commission: 1900,  network: "BankBazaar",  url: "https://bankbazaar.com/indusind-easydiner?utm_source=cardo&utm_medium=affiliate" },
  "idfc-wealth":        { commission: 1800,  network: "PaisaBazaar", url: "https://paisabazaar.com/idfc-first-wealth?utm_source=cardo&utm_medium=affiliate" },
  "pnb-rupay-select":   { commission: 1600,  network: "BankBazaar",  url: "https://bankbazaar.com/pnb-rupay-select?utm_source=cardo&utm_medium=affiliate" },
  "sc-ultimate":        { commission: 1500,  network: "BankBazaar",  url: "https://bankbazaar.com/standard-chartered-ultimate?utm_source=cardo&utm_medium=affiliate" },
  "sbi-cashback":       { commission: 1200,  network: "PaisaBazaar", url: "https://paisabazaar.com/sbi-cashback-card?utm_source=cardo&utm_medium=affiliate" },
  "hdfc-millennia":     { commission: 1000,  network: "PaisaBazaar", url: "https://paisabazaar.com/hdfc-millennia?utm_source=cardo&utm_medium=affiliate" },
  "yes-ace":            { commission: 900,   network: "PaisaBazaar", url: "https://paisabazaar.com/yes-ace?utm_source=cardo&utm_medium=affiliate" },
  "pnb-global":         { commission: 800,   network: "BankBazaar",  url: "https://bankbazaar.com/pnb-global?utm_source=cardo&utm_medium=affiliate" },
  "yes-byoc":           { commission: 700,   network: "Direct",      url: "https://yesbank.in/byoc?utm_source=cardo&utm_medium=affiliate" },
  "onecard-metal":      { commission: 600,   network: "Direct",      url: "https://getonecard.app/apply?utm_source=cardo&utm_medium=affiliate" },
  "federal-scapia":     { commission: 500,   network: "Direct",      url: "https://scapia.app/apply?utm_source=cardo&utm_medium=affiliate" },
  "kotak-league":       { commission: 500,   network: "BankBazaar",  url: "https://bankbazaar.com/kotak-league-platinum?utm_source=cardo&utm_medium=affiliate" },
  "kiwi-rupay":         { commission: 450,   network: "Direct",      url: "https://gokiwi.in/apply?utm_source=cardo&utm_medium=affiliate" },
  "axis-flipkart":      { commission: 400,   network: "PaisaBazaar", url: "https://paisabazaar.com/axis-flipkart?utm_source=cardo&utm_medium=affiliate" },
  "axis-airtel":        { commission: 400,   network: "PaisaBazaar", url: "https://paisabazaar.com/axis-airtel?utm_source=cardo&utm_medium=affiliate" },
  "hdfc-swiggy":        { commission: 300,   network: "PaisaBazaar", url: "https://paisabazaar.com/hdfc-swiggy?utm_source=cardo&utm_medium=affiliate" },
  "sbi-irctc":          { commission: 300,   network: "PaisaBazaar", url: "https://paisabazaar.com/sbi-irctc?utm_source=cardo&utm_medium=affiliate" },
  "icici-amazon":       { commission: 250,   network: "PaisaBazaar", url: "https://paisabazaar.com/icici-amazon-pay?utm_source=cardo&utm_medium=affiliate" },
  "idfc-select":        { commission: 200,   network: "PaisaBazaar", url: "https://paisabazaar.com/idfc-first-select?utm_source=cardo&utm_medium=affiliate" },
  "indusind-legend":    { commission: 150,   network: "Direct",      url: "https://indusind.com/legend?utm_source=cardo&utm_medium=affiliate" },
  "au-lit":             { commission: 100,   network: "Direct",      url: "https://aubank.in/au-lit?utm_source=cardo&utm_medium=affiliate" }
};

// ─────────────────────────────────────────────────────────────────────────────
//  CORE LOGIC
// ─────────────────────────────────────────────────────────────────────────────
function detectCategory(text) {
  const t = text.toLowerCase();
  if (/(amazon|amzn)/.test(t)) return "amazon";
  if (/(flipkart|fkrt)/.test(t)) return "flipkart";
  if (/(ola|uber|zomato|swiggy|domino|pizza|restaurant|cafe|food|dining|barbeque|beverage|mcd|kfc|subway)/.test(t)) return "dining";
  if (/(makemytrip|goibibo|cleartrip|irctc|yatra|booking|agoda|hotels|flight|ixigo|redbus|bus|train|cab|petrol|diesel|hp|bp|ioc)/.test(t)) return "travel";
  if (/(hp|bp|ioc|shell|bharat|petroleum|petrol|diesel|cng|fuel|gas)/.test(t)) return "fuel";
  if (/(myntra|nykaa|bookmyshow|hotstar|netflix|spotify|paytm|gpay|phonepe|recharge|bill|online|upi|net banking|pos)/.test(t)) return "online";
  return "default";
}
function fmt(n) { return "₹" + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); }
function getCardRankings(cardIds, category, amount) {
  return cardIds.map(id => {
    const card = CARD_DB[id];
    if (!card) return null;
    const rate = card.benefits[category] || card.benefits.default;
    const value = (amount * rate) / 100;
    return { card, rate, value };
  }).filter(Boolean).sort((a, b) => b.value - a.value);
}

// ─────────────────────────────────────────────────────────────────────────────
//  ENHANCED SMS PARSING WITH MOBILE PERMISSIONS
// ─────────────────────────────────────────────────────────────────────────────

// Check for SMS permissions on mobile
async function requestSMSPermission() {
  if ('permissions' in navigator) {
    try {
      // Request SMS permission (Android)
      const result = await navigator.permissions.query({name: 'sms'});
      return result.state === 'granted';
    } catch (err) {
      console.log('SMS permission not available:', err);
      return false;
    }
  }
  return false;
}

// Enhanced SMS parsing with more bank formats
function parseSMSQuick(sms) {
  const today = new Date().toISOString().split('T')[0];
  
  // HDFC Bank format (multiple variants)
  let match = sms.match(/Rs\s?([0-9,]+(?:\.[0-9]{2})?).*?(?:debited|charged).*?(?:from|via|at).*?(?:HDFC|hdfc).*?(?:a\/c|account|card).*?([0-9]{4})/i);
  if (match) {
    const merchantMatch = sms.match(/(?:at|via|on|from)\s([A-Za-z0-9\s\-\.]+?)(?:\s|$|\.|,|\son|\sUPI)/i);
    return {
      amount: parseFloat(match[1].replace(/,/g, '')),
      merchant: merchantMatch ? merchantMatch[1].trim() : "Unknown",
      bank: "HDFC Bank",
      type: "debit",
      date: today,
      lastFour: match[2]
    };
  }
  
  // SBI format (enhanced)
  match = sms.match(/Rs\s?([0-9,]+(?:\.[0-9]{2})?).*?(?:debited|spent|used).*?(?:SBI|sbi).*?(?:card|a\/c|account).*?([0-9]{4})/i);
  if (match) {
    const merchantMatch = sms.match(/(?:at|via|on|from)\s([A-Za-z0-9\s\-\.]+?)(?:\s|$|\.|,|\son)/i);
    return {
      amount: parseFloat(match[1].replace(/,/g, '')),
      merchant: merchantMatch ? merchantMatch[1].trim() : "Unknown",
      bank: "SBI Card",
      type: "debit",
      date: today,
      lastFour: match[2]
    };
  }
  
  // ICICI format (enhanced)
  match = sms.match(/Rs[\s\.]?([0-9,]+(?:\.[0-9]{2})?).*?(?:debited|spent|used).*?ICICI.*?(?:card|a\/c|account).*?([0-9]{4})/i);
  if (match) {
    const merchantMatch = sms.match(/(?:at|via|on|from)\s([A-Za-z0-9\s\-\.]+?)(?:\s|$|\.|,|\son)/i);
    return {
      amount: parseFloat(match[1].replace(/,/g, '')),
      merchant: merchantMatch ? merchantMatch[1].trim() : "Unknown",
      bank: "ICICI Bank",
      type: "debit",
      date: today,
      lastFour: match[2]
    };
  }
  
  // Axis format (enhanced)
  match = sms.match(/Rs[\s\.]?([0-9,]+(?:\.[0-9]{2})?).*?(?:debited|spent|used).*?Axis.*?(?:card|a\/c|account).*?([0-9]{4})/i);
  if (match) {
    const merchantMatch = sms.match(/(?:at|via|on|from)\s([A-Za-z0-9\s\-\.]+?)(?:\s|$|\.|,|\son)/i);
    return {
      amount: parseFloat(match[1].replace(/,/g, '')),
      merchant: merchantMatch ? merchantMatch[1].trim() : "Unknown",
      bank: "Axis Bank",
      type: "debit",
      date: today,
      lastFour: match[2]
    };
  }
  
  // Yes Bank format
  match = sms.match(/Rs[\s\.]?([0-9,]+(?:\.[0-9]{2})?).*?(?:debited|spent|used).*?(?:YES|yes).*?(?:card|a\/c|account).*?([0-9]{4})/i);
  if (match) {
    const merchantMatch = sms.match(/(?:at|via|on|from)\s([A-Za-z0-9\s\-\.]+?)(?:\s|$|\.|,|\son)/i);
    return {
      amount: parseFloat(match[1].replace(/,/g, '')),
      merchant: merchantMatch ? merchantMatch[1].trim() : "Unknown",
      bank: "Yes Bank",
      type: "debit",
      date: today,
      lastFour: match[2]
    };
  }
  
  // Kotak format
  match = sms.match(/Rs[\s\.]?([0-9,]+(?:\.[0-9]{2})?).*?(?:debited|spent|used).*?Kotak.*?(?:card|a\/c|account).*?([0-9]{4})/i);
  if (match) {
    const merchantMatch = sms.match(/(?:at|via|on|from)\s([A-Za-z0-9\s\-\.]+?)(?:\s|$|\.|,|\son)/i);
    return {
      amount: parseFloat(match[1].replace(/,/g, '')),
      merchant: merchantMatch ? merchantMatch[1].trim() : "Unknown",
      bank: "Kotak Mahindra Bank",
      type: "debit",
      date: today,
      lastFour: match[2]
    };
  }
  
  // IDFC FIRST Bank format
  match = sms.match(/Rs[\s\.]?([0-9,]+(?:\.[0-9]{2})?).*?(?:debited|spent|used).*?IDFC.*?(?:card|a\/c|account).*?([0-9]{4})/i);
  if (match) {
    const merchantMatch = sms.match(/(?:at|via|on|from)\s([A-Za-z0-9\s\-\.]+?)(?:\s|$|\.|,|\son)/i);
    return {
      amount: parseFloat(match[1].replace(/,/g, '')),
      merchant: merchantMatch ? merchantMatch[1].trim() : "Unknown",
      bank: "IDFC FIRST Bank",
      type: "debit",
      date: today,
      lastFour: match[2]
    };
  }
  
  // AU Small Finance Bank format
  match = sms.match(/Rs[\s\.]?([0-9,]+(?:\.[0-9]{2})?).*?(?:debited|spent|used).*?AU.*?(?:card|a\/c|account).*?([0-9]{4})/i);
  if (match) {
    const merchantMatch = sms.match(/(?:at|via|on|from)\s([A-Za-z0-9\s\-\.]+?)(?:\s|$|\.|,|\son)/i);
    return {
      amount: parseFloat(match[1].replace(/,/g, '')),
      merchant: merchantMatch ? merchantMatch[1].trim() : "Unknown",
      bank: "AU Small Finance Bank",
      type: "debit",
      date: today,
      lastFour: match[2]
    };
  }
  
  // IndusInd Bank format
  match = sms.match(/Rs[\s\.]?([0-9,]+(?:\.[0-9]{2})?).*?(?:debited|spent|used).*?IndusInd.*?(?:card|a\/c|account).*?([0-9]{4})/i);
  if (match) {
    const merchantMatch = sms.match(/(?:at|via|on|from)\s([A-Za-z0-9\s\-\.]+?)(?:\s|$|\.|,|\son)/i);
    return {
      amount: parseFloat(match[1].replace(/,/g, '')),
      merchant: merchantMatch ? merchantMatch[1].trim() : "Unknown",
      bank: "IndusInd Bank",
      type: "debit",
      date: today,
      lastFour: match[2]
    };
  }
  
  // Punjab National Bank format
  match = sms.match(/Rs[\s\.]?([0-9,]+(?:\.[0-9]{2})?).*?(?:debited|spent|used).*?PNB.*?(?:card|a\/c|account).*?([0-9]{4})/i);
  if (match) {
    const merchantMatch = sms.match(/(?:at|via|on|from)\s([A-Za-z0-9\s\-\.]+?)(?:\s|$|\.|,|\son)/i);
    return {
      amount: parseFloat(match[1].replace(/,/g, '')),
      merchant: merchantMatch ? merchantMatch[1].trim() : "Unknown",
      bank: "Punjab National Bank",
      type: "debit",
      date: today,
      lastFour: match[2]
    };
  }
  
  // OneCard format
  match = sms.match(/Rs[\s\.]?([0-9,]+(?:\.[0-9]{2})?).*?(?:debited|spent|used).*?(?:OneCard|FPL).*?(?:card|a\/c|account).*?([0-9]{4})/i);
  if (match) {
    const merchantMatch = sms.match(/(?:at|via|on|from)\s([A-Za-z0-9\s\-\.]+?)(?:\s|$|\.|,|\son)/i);
    return {
      amount: parseFloat(match[1].replace(/,/g, '')),
      merchant: merchantMatch ? merchantMatch[1].trim() : "Unknown",
      bank: "OneCard (FPL Tech)",
      type: "debit",
      date: today,
      lastFour: match[2]
    };
  }
  
  // UPI credit card format (generic)
  match = sms.match(/Rs[\s\.]?([0-9,]+(?:\.[0-9]{2})?).*?(?:debited|paid).*?UPI.*?([A-Za-z\s]+).*?([0-9]{4})/i);
  if (match) {
    const bankName = match[2].trim();
    return {
      amount: parseFloat(match[1].replace(/,/g, '')),
      merchant: "UPI Transaction",
      bank: bankName,
      type: "debit",
      date: today,
      lastFour: match[3]
    };
  }
  
  return null;
}

async function parseSMSWithAI(sms) {
  try {
    const response = await fetch('/api/ask-cardo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 400,
        messages: [{
          role: 'user',
          content: `Parse this Indian bank SMS for a debit transaction. Support these banks: HDFC, SBI, ICICI, Axis, Yes Bank, Kotak, IDFC FIRST, AU Bank, IndusInd, PNB, OneCard. Return ONLY JSON with no markdown formatting:

{"amount": number, "merchant": "string", "bank": "string", "type": "string", "date": "YYYY-MM-DD", "lastFour": "string", "balance": number}

If not a debit transaction, return: {"error": "not a debit transaction"}

SMS: ${sms}`
        }]
      })
    });
    
    const data = await response.json();
    const content = data.content?.map(c => c.text || "").join("") || "";
    const cleanContent = content.replace(/```json|```/g, "").trim();
    
    return JSON.parse(cleanContent);
  } catch (err) {
    console.error("AI SMS parsing failed:", err);
    return parseSMSQuick(sms); // Fallback to regex
  }
}

// Background SMS listener for Android
async function startSMSListener(onSMSReceived) {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw-sms.js');
      
      // Listen for SMS messages from service worker
      navigator.serviceWorker.addEventListener('message', async (event) => {
        if (event.data.type === 'SMS_RECEIVED') {
          const parsedSMS = await parseSMSWithAI(event.data.message);
          if (parsedSMS && !parsedSMS.error) {
            onSMSReceived(parsedSMS);
          }
        }
      });
      
      console.log('SMS listener service worker registered');
    } catch (err) {
      console.error('Failed to register SMS service worker:', err);
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
//  MOCK DATA (Updated)
// ─────────────────────────────────────────────────────────────────────────────
const INITIAL_CARDS = ["hdfc-millennia", "sbi-cashback", "idfc-select", "kiwi-rupay"];
const INITIAL_EXPENSES = [
  { id: "exp1", merchant: "Amazon.in", amount: 4999, category: "amazon", cardId: "hdfc-millennia", date: "2026-04-15", note: "" },
  { id: "exp2", merchant: "Swiggy", amount: 850, category: "dining", cardId: "kiwi-rupay", date: "2026-04-14", note: "UPI payment" },
  { id: "exp3", merchant: "Shell Petrol", amount: 3000, category: "fuel", cardId: "idfc-select", date: "2026-04-13", note: "Full tank" },
  { id: "exp4", merchant: "BookMyShow", amount: 750, category: "online", cardId: "hdfc-millennia", date: "2026-04-12", note: "" },
  { id: "exp5", merchant: "BigBasket", amount: 2500, category: "online", cardId: "sbi-cashback", date: "2026-04-11", note: "Groceries" },
  { id: "exp6", merchant: "MakeMyTrip", amount: 12000, category: "travel", cardId: "idfc-select", date: "2026-04-10", note: "Goa flight tickets" },
  { id: "exp7", merchant: "Zomato", amount: 650, category: "dining", cardId: "kiwi-rupay", date: "2026-04-09", note: "Lunch UPI payment" }
];

// ─────────────────────────────────────────────────────────────────────────────
//  MAIN APP
// ─────────────────────────────────────────────────────────────────────────────
export default function CardoApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  if (!isLoggedIn) {
    return <AuthScreen onLogin={() => setIsLoggedIn(true)} />;
  }
  
  return <MainApp />;
}

// ─────────────────────────────────────────────────────────────────────────────
//  AUTH SCREEN (Same as before)
// ─────────────────────────────────────────────────────────────────────────────
function AuthScreen({ onLogin }) {
  const [step, setStep] = useState('login');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const otpRefs = useRef([]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 1500);
  };

  const sendOTP = async () => {
    if (!phone || phone.length !== 10) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 2000);
  };

  const verifyOTP = async () => {
    if (otp.join('').length !== 6) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 2000);
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  return (
    <div style={{fontFamily:"'Sora',sans-serif",background:"#06060F",color:"#E8E8F4",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap');`}</style>
      
      <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(201,168,76,.2)",borderRadius:22,padding:40,width:380,textAlign:"center"}}>
        
        <div style={{fontSize:42,fontWeight:800,marginBottom:8}}>
          <span style={{color:"#C9A84C"}}>C</span>ardo
        </div>
        <div style={{fontSize:14,color:"#777799",marginBottom:32}}>India's Smart Credit Card Companion</div>
        
        {step === 'login' && (
          <div style={{animation:"slideUp .3s ease"}}>
            <div style={{fontSize:18,fontWeight:700,marginBottom:20}}>Welcome Back</div>
            
            <button onClick={handleGoogleLogin} disabled={loading} style={{width:"100%",background:"linear-gradient(135deg,#4285F4,#34A853)",border:"none",borderRadius:12,padding:"12px 16px",color:"white",fontWeight:600,fontSize:14,cursor:loading?"not-allowed":"pointer",marginBottom:16,display:"flex",alignItems:"center",justifyContent:"center",gap:10,fontFamily:"inherit"}}>
              {loading ? "Signing in..." : (
                <><span style={{fontSize:18}}>🔍</span>Continue with Google</>
              )}
            </button>
            
            <div style={{display:"flex",alignItems:"center",margin:"20px 0",color:"#555577",fontSize:12}}>
              <div style={{flex:1,height:1,background:"rgba(255,255,255,.1)"}}></div>
              <span style={{margin:"0 12px"}}>OR</span>
              <div style={{flex:1,height:1,background:"rgba(255,255,255,.1)"}}></div>
            </div>
            
            <button onClick={() => setStep('phone')} style={{width:"100%",background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",borderRadius:12,padding:"12px 16px",color:"#E8E8F4",fontWeight:600,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:10,fontFamily:"inherit"}}>
              <span style={{fontSize:18}}>📱</span>Continue with Phone
            </button>
          </div>
        )}
        
        {step === 'phone' && (
          <div style={{animation:"slideUp .3s ease"}}>
            <div style={{fontSize:18,fontWeight:700,marginBottom:6}}>Enter Phone Number</div>
            <div style={{fontSize:12,color:"#777799",marginBottom:20}}>We'll send you a 6-digit verification code</div>
            
            <div style={{display:"flex",marginBottom:20}}>
              <div style={{background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",borderRadius:"8px 0 0 8px",padding:"10px 12px",color:"#AAAACC",fontSize:13}}>+91</div>
              <input value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} placeholder="9876543210" style={{flex:1,background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",borderLeft:"none",borderRadius:"0 8px 8px 0",padding:"10px 13px",color:"#E8E8F4",fontFamily:"inherit",fontSize:13}} />
            </div>
            
            <button onClick={sendOTP} disabled={loading || phone.length !== 10} style={{width:"100%",background:phone.length===10?"linear-gradient(135deg,#C9A84C,#E8C97A)":"rgba(255,255,255,.05)",border:"none",borderRadius:12,padding:"12px 16px",color:phone.length===10?"#06060F":"#555577",fontWeight:700,fontSize:14,cursor:(loading||phone.length!==10)?"not-allowed":"pointer",marginBottom:16,fontFamily:"inherit"}}>
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
            
            <button onClick={() => setStep('login')} style={{background:"none",border:"none",color:"#888899",fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>← Back to login options</button>
          </div>
        )}
        
        {step === 'otp' && (
          <div style={{animation:"slideUp .3s ease"}}>
            <div style={{fontSize:18,fontWeight:700,marginBottom:6}}>Enter Verification Code</div>
            <div style={{fontSize:12,color:"#777799",marginBottom:20}}>Sent to +91 {phone}</div>
            
            <div style={{display:"flex",gap:8,justifyContent:"center",marginBottom:24}}>
              {otp.map((digit, i) => (
                <input key={i} ref={el => otpRefs.current[i] = el} value={digit} onChange={e => handleOtpChange(i, e.target.value)} maxLength="1" style={{width:42,height:48,background:"rgba(255,255,255,.05)",border:`2px solid ${digit?'#C9A84C':'rgba(255,255,255,.1)'}`,borderRadius:8,textAlign:"center",color:"#E8E8F4",fontSize:18,fontWeight:700,fontFamily:"inherit"}} />
              ))}
            </div>
            
            <button onClick={verifyOTP} disabled={loading || otp.join('').length !== 6} style={{width:"100%",background:otp.join('').length===6?"linear-gradient(135deg,#C9A84C,#E8C97A)":"rgba(255,255,255,.05)",border:"none",borderRadius:12,padding:"12px 16px",color:otp.join('').length===6?"#06060F":"#555577",fontWeight:700,fontSize:14,cursor:(loading||otp.join('').length!==6)?"not-allowed":"pointer",marginBottom:16,fontFamily:"inherit"}}>
              {loading ? "Verifying..." : "Verify & Continue"}
            </button>
            
            <button onClick={() => setStep('phone')} style={{background:"none",border:"none",color:"#888899",fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>← Change phone number</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  MAIN APP (Enhanced with SMS auto-sync)
// ─────────────────────────────────────────────────────────────────────────────
function MainApp() {
  const [tab, setTab] = useState("home");
  const [myCards, setMyCards] = useState(INITIAL_CARDS);
  const [expenses, setExpenses] = useState(INITIAL_EXPENSES);
  const [affLog, setAffLog] = useState([]);
  const [aiQuery, setAiQuery] = useState("");
  const [aiResp, setAiResp] = useState(null);
  const [myCardModal, setMyCardModal] = useState(null);
  const [cardModal, setCardModal] = useState(null);
  const [addCardOpen, setAddCardOpen] = useState(false);
  const [addExpOpen, setAddExpOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [expandedExp, setExpandedExp] = useState(null);
  const [smsPermission, setSmsPermission] = useState(false);

  // Enhanced SMS auto-sync on component mount
  useEffect(() => {
    const initSMSSync = async () => {
      const hasPermission = await requestSMSPermission();
      setSmsPermission(hasPermission);
      
      if (hasPermission) {
        // Start SMS listening service
        await startSMSListener((parsedSMS) => {
          const newExp = {
            id: `exp${Date.now()}`,
            merchant: parsedSMS.merchant,
            amount: parsedSMS.amount,
            category: detectCategory(parsedSMS.merchant),
            cardId: myCards[0], // Default to first card, could be enhanced to match by bank
            date: parsedSMS.date,
            note: "Auto-imported from SMS"
          };
          setExpenses(prev => [newExp, ...prev]);
          
          // Show notification
          if ('Notification' in window) {
            new Notification('💳 Cardo: Transaction Added', {
              body: `${fmt(newExp.amount)} spent at ${newExp.merchant}`,
              icon: '/icon-192x192.png'
            });
          }
        });
      }
    };
    
    initSMSSync();
  }, [myCards]);

  const allStats = expenses.map(e => {
    const rankings = getCardRankings(myCards, e.category, e.amount);
    const used = rankings.find(r => r.card.id === e.cardId);
    const best = rankings[0];
    const usedValue = used ? used.value : 0;
    const bestValue = best ? best.value : 0;
    const missedSaving = bestValue - usedValue;
    let decision, emoji, color;
    if (missedSaving < 10) { decision = "Optimal"; emoji = "🎯"; color = "#4ADE80"; }
    else if (missedSaving < 50) { decision = "Good"; emoji = "🙂"; color = "#81C784"; }
    else if (missedSaving < 200) { decision = "Better option"; emoji = "😐"; color = "#FFA726"; }
    else { decision = "Missed savings"; emoji = "😬"; color = "#F87171"; }
    return { decision, emoji, color, usedValue, bestValue, missedSaving, bestCard: best };
  });

  const totalSpent = expenses.reduce((s, e) => s + e.amount, 0);
  const totalEarned = allStats.reduce((s, st) => s + st.usedValue, 0);
  const totalMissed = allStats.reduce((s, st) => s + st.missedSaving, 0);

  const TABS = [{id:"home",icon:"🏠",label:"Home"},{id:"wallet",icon:"💳",label:"Wallet"},{id:"sms",icon:"📱",label:"Sync"},{id:"explore",icon:"🔍",label:"Explore"},{id:"earn",icon:"💰",label:"Earn"}];

  async function handleAIQuery() {
    if (!aiQuery.trim()) return;
    setAiResp(null);
    
    try {
      const myCardsWithRates = myCards.map(id => {
        const c = CARD_DB[id];
        return `${c.bank} ${c.name} (${Object.entries(c.benefits).map(([cat, rate]) => `${cat}:${rate}%`).join(', ')})`;
      }).join('; ');

      const response = await fetch('/api/ask-cardo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 800,
          tools: [{ type: 'web_search_20250305', name: 'web_search' }],
          messages: [{
            role: 'user',
            content: `You are Cardo, an expert Indian credit card AI advisor. The user owns these cards: ${myCardsWithRates}. 

For this purchase query: "${aiQuery}"

1. Search for any live bank offers related to this purchase
2. Recommend the best card from their wallet

Respond ONLY in this JSON format (no markdown):
{"bestCard": "card name", "bank": "bank name", "rate": "X%", "saving": "₹X", "reason": "why this card", "liveOffer": "any current offer found or null", "proTip": "optimization tip or null"}`
          }]
        })
      });
      
      const data = await response.json();
      const content = data.content?.map(c => c.text || "").join("") || "";
      const cleanContent = content.replace(/```json|```/g, "").trim();
      setAiResp(JSON.parse(cleanContent));
    } catch (err) {
      console.error("AI query failed:", err);
      
      // Fallback to local recommendation
      const amount = parseFloat(aiQuery.match(/[₹$]?([\d,]+)/)?.[1]?.replace(/,/g, '') || '1000');
      const category = detectCategory(aiQuery);
      const rankings = getCardRankings(myCards, category, amount);
      const best = rankings[0];
      
      if (best) {
        setAiResp({
          bestCard: best.card.name,
          bank: best.card.bank,
          rate: `${best.rate}%`,
          saving: fmt(Math.round(best.value)),
          reason: `${best.rate}% on ${category} category`,
          liveOffer: null,
          proTip: null
        });
      }
    }
  }

  return (
    <div style={{fontFamily:"'Sora',sans-serif",background:"#06060F",color:"#E8E8F4",minHeight:"100vh",maxWidth:430,margin:"0 auto",position:"relative",overflowX:"hidden"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');*{box-sizing:border-box;margin:0;padding:0;}::-webkit-scrollbar{width:3px;height:3px;}::-webkit-scrollbar-thumb{background:#2A2A3E;border-radius:4px;}@keyframes slideUp{from{transform:translateY(14px);opacity:0}to{transform:translateY(0);opacity:1}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}@keyframes chipGlow{0%,100%{opacity:.7}50%{opacity:1}}.chov:hover{transform:translateY(-2px);box-shadow:0 10px 28px rgba(0,0,0,.45);transition:all .2s;}.bhov:hover{filter:brightness(1.12);transition:filter .15s;}.card3d{transition:transform .3s ease,box-shadow .3s ease;cursor:pointer;}.card3d:hover{transform:perspective(500px) rotateY(-8deg) rotateX(4deg) translateY(-5px) scale(1.03);box-shadow:0 28px 52px rgba(0,0,0,.65);}.card3d-full{transition:transform .25s ease,box-shadow .25s ease;cursor:pointer;}.card3d-full:hover{transform:perspective(700px) rotateY(-4deg) rotateX(2deg) scale(1.015);box-shadow:0 22px 44px rgba(0,0,0,.55);}.shimmer{position:absolute;inset:0;background:linear-gradient(105deg,transparent 35%,rgba(255,255,255,.08) 50%,transparent 65%);background-size:200% 100%;animation:shimmer 2.8s linear infinite;border-radius:inherit;pointer-events:none;}input,select,textarea{font-family:inherit!important;}input:focus,select:focus{outline:none!important;border-color:#C9A84C!important;}.mono{font-family:'Space Mono',monospace!important;}`}</style>
      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,background:"radial-gradient(ellipse 70% 40% at 50% 0%,rgba(201,168,76,.08) 0%,transparent 70%)"}}/>

      {/* ── HEADER ── */}
      <div style={{position:"sticky",top:0,zIndex:60,background:"rgba(6,6,15,.95)",backdropFilter:"blur(14px)",borderBottom:"1px solid rgba(201,168,76,.12)",padding:"12px 16px 0"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
          <div style={{fontSize:22,fontWeight:800,letterSpacing:-1}}><span style={{color:"#C9A84C"}}>C</span>ardo</div>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            {/* SMS Status Indicator */}
            {smsPermission && (
              <div style={{background:"rgba(74,222,128,.1)",border:"1px solid rgba(74,222,128,.3)",borderRadius:8,padding:"4px 8px",fontSize:10,color:"#4ADE80",fontWeight:600}}>
                📱 SMS Sync
              </div>
            )}
            <div style={{position:"relative"}}>
              <div onClick={() => setShowProfile(!showProfile)} className="chov" style={{background:"rgba(201,168,76,.1)",border:"1px solid rgba(201,168,76,.3)",borderRadius:"50%",width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:13}}>💰</div>
              {showProfile && (
                <div style={{position:"absolute",top:44,right:0,background:"rgba(11,11,24,.98)",border:"1px solid rgba(201,168,76,.2)",borderRadius:12,padding:14,minWidth:180,animation:"fadeIn .2s ease",zIndex:70}}>
                  <div style={{fontSize:13,fontWeight:600,marginBottom:8}}>Total Earned</div>
                  <div style={{fontSize:20,color:"#4ADE80",fontWeight:800,marginBottom:12}}>{fmt(totalEarned.toFixed(0))}</div>
                  <div style={{fontSize:11,color:"#555577",borderTop:"1px solid rgba(255,255,255,.05)",paddingTop:8,cursor:"pointer"}}>Sign Out →</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── AI ADVISOR BAR ── */}
        <div style={{marginBottom:8}}>
          <div style={{display:"flex",gap:8}}>
            <input value={aiQuery} onChange={e => setAiQuery(e.target.value)} placeholder="Which card for ₹3,000 on Swiggy?" style={{flex:1,background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",borderRadius:10,padding:"9px 13px",color:"#E8E8F4",fontSize:13,fontFamily:"inherit"}} onKeyDown={e => e.key === 'Enter' && handleAIQuery()}/>
            <button onClick={handleAIQuery} disabled={!aiQuery.trim()} style={{background:aiQuery.trim()?"linear-gradient(135deg,#C9A84C,#E8C97A)":"rgba(255,255,255,.05)",border:"none",borderRadius:10,padding:"9px 14px",cursor:aiQuery.trim()?"pointer":"not-allowed",fontSize:20}}>🧠</button>
          </div>
          {aiResp && (
            <div style={{marginTop:8,background:"rgba(255,255,255,.025)",border:"1px solid rgba(201,168,76,.2)",borderRadius:12,padding:14}}>
              <div style={{fontSize:13,fontWeight:700,marginBottom:6}}><span style={{color:"#C9A84C"}}>{aiResp.bestCard}</span> ({aiResp.bank}) • {aiResp.rate} • Save {aiResp.saving}</div>
              <div style={{fontSize:12,color:"#CCCCDD",marginBottom:6}}>{aiResp.reason}</div>
              {aiResp.liveOffer && <div style={{fontSize:11,color:"#FCA5A5",background:"rgba(251,146,60,.1)",borderRadius:6,padding:"4px 8px",marginBottom:4}}>🔥 {aiResp.liveOffer}</div>}
              {aiResp.proTip && <div style={{fontSize:11,color:"#FCD34D"}}>💡 {aiResp.proTip}</div>}
            </div>
          )}
        </div>

        {/* ── NAV TABS ── */}
        <div style={{display:"flex",justifyContent:"space-between",paddingBottom:4}}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{background:tab===t.id?"rgba(201,168,76,.15)":"none",border:"none",borderRadius:8,padding:"8px 12px",cursor:"pointer",fontSize:10,fontFamily:"inherit",color:tab===t.id?"#C9A84C":"#777799",fontWeight:tab===t.id?700:500,display:"flex",flexDirection:"column",alignItems:"center",gap:2,minWidth:60}}>
              <span style={{fontSize:16}}>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div style={{padding:"16px 16px 80px",position:"relative",zIndex:1}}>
        {tab === "home" && <HomeTab totalSpent={totalSpent} totalEarned={totalEarned} totalMissed={totalMissed} myCards={myCards} expenses={expenses} allStats={allStats} onCardClick={setMyCardModal} onGoWallet={() => setTab("wallet")} onAddCard={() => setAddCardOpen(true)} onAddExp={() => setAddExpOpen(true)} expandedExp={expandedExp} setExpandedExp={setExpandedExp} />}
        {tab === "wallet" && <WalletTab myCards={myCards} setMyCards={setMyCards} onCardClick={setMyCardModal} onAddCard={() => setAddCardOpen(true)} expenses={expenses} allStats={allStats} />}
        {tab === "sms" && <SMSSyncTab expenses={expenses} setExpenses={setExpenses} myCards={myCards} smsPermission={smsPermission} setSmsPermission={setSmsPermission} />}
        {tab === "explore" && <ExploreTab myCards={myCards} setMyCards={setMyCards} onCardClick={setCardModal} />}
        {tab === "earn" && <EarnTab affLog={affLog} setAffLog={setAffLog} />}
      </div>

      {/* ── MODALS ── */}
      {myCardModal && <MyCardDashboard card={myCardModal} onClose={() => setMyCardModal(null)} expenses={expenses} allStats={allStats} />}
      {cardModal && <CardModal card={cardModal} owned={myCards.includes(cardModal.id)} onClose={() => setCardModal(null)} onAdd={() => {setMyCards([...myCards, cardModal.id]); setCardModal(null);}} onRemove={() => {setMyCards(myCards.filter(id => id !== cardModal.id)); setCardModal(null);}} onAffiliate={affUrl => {setAffLog([...affLog, {id:Date.now(),cardId:cardModal.id,network:AFF[cardModal.id]?.network||"Direct",commission:AFF[cardModal.id]?.commission||0,clickedAt:new Date().toISOString()}]); window.open(affUrl, "_blank");}} />}
      {addCardOpen && <AddCardModal myCards={myCards} setMyCards={setMyCards} onClose={() => setAddCardOpen(false)} />}
      {addExpOpen && <AddExpenseModal expenses={expenses} setExpenses={setExpenses} myCards={myCards} onClose={() => setAddExpOpen(false)} />}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  CREDIT CARD VISUAL COMPONENT (Same as before but enhanced)
// ─────────────────────────────────────────────────────────────────────────────
function CreditCardVisual({ card, size = "mini", onClick, onRemove }) {
  const isFull = size === "full";

  const Chip = () => (
    <svg width={isFull?34:26} height={isFull?26:20} viewBox="0 0 34 26" fill="none" style={{flexShrink:0,animation:"chipGlow 2.5s ease-in-out infinite"}}>
      <rect width="34" height="26" rx="4" fill={card.accent} opacity=".9"/>
      <rect x="1" y="1" width="32" height="24" rx="3" fill="none" stroke="rgba(0,0,0,.25)" strokeWidth=".5"/>
      <line x1="0" y1="9" x2="34" y2="9" stroke="rgba(0,0,0,.2)" strokeWidth=".8"/>
      <line x1="0" y1="17" x2="34" y2="17" stroke="rgba(0,0,0,.2)" strokeWidth=".8"/>
      <line x1="11" y1="0" x2="11" y2="26" stroke="rgba(0,0,0,.2)" strokeWidth=".8"/>
      <line x1="23" y1="0" x2="23" y2="26" stroke="rgba(0,0,0,.2)" strokeWidth=".8"/>
      <rect x="11" y="9" width="12" height="8" rx="1" fill="rgba(0,0,0,.15)"/>
    </svg>
  );

  const Contactless = () => (
    <svg width={isFull?18:14} height={isFull?22:17} viewBox="0 0 18 22" fill="none">
      {[14,10,6].map((r,i) => (
        <path key={r} d={`M9 ${11-r/2} A${r/2} ${r} 0 0 1 9 ${11+r/2}`}
          stroke={`rgba(255,255,255,${.25+i*.2})`} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      ))}
      <circle cx="9" cy="11" r="1.5" fill="rgba(255,255,255,.7)"/>
    </svg>
  );

  const networkColor = {
    "Visa":"rgba(255,255,255,.55)","Visa Infinite":"rgba(255,255,255,.7)",
    "Mastercard":"rgba(255,165,0,.65)","Amex":"rgba(100,200,255,.6)",
    "RuPay":"rgba(120,255,120,.5)"
  };
  const netCol = networkColor[card.network] || "rgba(255,255,255,.45)";

  if (size === "mini") {
    return (
      <div onClick={onClick} className="card3d" style={{
        position:"relative",width:164,aspectRatio:"1.586",flexShrink:0,
        background:`linear-gradient(135deg,${card.gradient[0]} 0%,${card.gradient[1]} 100%)`,
        borderRadius:12,padding:"12px 14px",overflow:"hidden",
        border:`1px solid ${card.accent}28`,
        boxShadow:`0 8px 24px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.08)`,
      }}>
        <div className="shimmer"/>
        <div style={{position:"absolute",width:120,height:120,borderRadius:"50%",background:`${card.accent}08`,top:-30,right:-30,pointerEvents:"none"}}/>

        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
          <div style={{maxWidth:100}}>
            <div style={{fontSize:8,color:card.accent,letterSpacing:1.5,textTransform:"uppercase",fontWeight:700,lineHeight:1.2}}>{card.bank}</div>
            <div style={{fontSize:9,color:"rgba(255,255,255,.7)",fontWeight:600,marginTop:1,lineHeight:1.2}}>{card.name}</div>
          </div>
          <Contactless/>
        </div>

        <div style={{marginBottom:8}}><Chip/></div>
        <div className="mono" style={{fontSize:9,color:"rgba(255,255,255,.5)",letterSpacing:2,marginBottom:6}}>•••• •••• •••• ••••</div>

        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end"}}>
          <div style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,.9)",letterSpacing:.3,lineHeight:1.2}}>{card.name}</div>
          <div style={{fontSize:8,color:netCol,fontWeight:700,letterSpacing:.5,textTransform:"uppercase"}}>{card.network}</div>
        </div>
      </div>
    );
  }

  return (
    <div onClick={onClick} className="card3d-full" style={{
      position:"relative",width:"100%",aspectRatio:"1.586",
      background:`linear-gradient(135deg,${card.gradient[0]} 0%,${card.gradient[1]} 60%,${card.gradient[0]}CC 100%)`,
      borderRadius:18,padding:"22px 24px 18px",overflow:"hidden",marginBottom:16,
      border:`1px solid ${card.accent}22`,
      boxShadow:`0 12px 40px rgba(0,0,0,.55), inset 0 1px 0 rgba(255,255,255,.1)`,
    }}>
      <div className="shimmer"/>
      <div style={{position:"absolute",width:240,height:240,borderRadius:"50%",background:`${card.accent}07`,top:-60,right:-60,pointerEvents:"none"}}/>

      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"auto"}}>
        <div>
          <div style={{fontSize:10,color:card.accent,letterSpacing:2,textTransform:"uppercase",fontWeight:700,marginBottom:3}}>{card.bank}</div>
          <div style={{fontSize:20,fontWeight:800,color:"#fff",letterSpacing:-.3}}>{card.name}</div>
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <Contactless/>
          <span style={{fontSize:28}}>{card.emoji}</span>
          {onRemove && (
            <button onClick={e=>{e.stopPropagation();onRemove();}} style={{
              background:"rgba(239,68,68,.2)",border:"1px solid rgba(239,68,68,.3)",
              borderRadius:6,width:26,height:26,color:"#F87171",cursor:"pointer",
              fontSize:10,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0
            }}>✕</button>
          )}
        </div>
      </div>

      <div style={{marginTop:16,marginBottom:14}}><Chip/></div>
      <div className="mono" style={{fontSize:15,color:"rgba(255,255,255,.55)",letterSpacing:4,marginBottom:12}}>••••   ••••   ••••   ••••</div>

      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end"}}>
        <div>
          <div style={{fontSize:8,color:"rgba(255,255,255,.35)",letterSpacing:1.5,textTransform:"uppercase",marginBottom:3}}>Card Holder</div>
          <div style={{fontSize:12,color:"rgba(255,255,255,.75)",fontWeight:600,letterSpacing:.5}}>Your Name</div>
        </div>
        <div style={{textAlign:"right"}}>
          <div style={{fontSize:8,color:"rgba(255,255,255,.35)",letterSpacing:1.5,textTransform:"uppercase",marginBottom:3}}>Network</div>
          <div style={{fontSize:13,color:netCol,fontWeight:800,letterSpacing:1,textTransform:"uppercase"}}>{card.network}</div>
        </div>
        <div style={{textAlign:"right"}}>
          <div style={{fontSize:8,color:"rgba(255,255,255,.35)",letterSpacing:1.5,textTransform:"uppercase",marginBottom:3}}>Annual Fee</div>
          <div style={{fontSize:11,color:card.ltf?"#4ADE80":card.accent,fontWeight:700}}>{card.ltf?"FREE":card.fee}</div>
        </div>
      </div>
    </div>
  );
}

// ── TAB COMPONENTS (Same implementations as before but using the expanded CARD_DB)
function HomeTab({ totalSpent, totalEarned, totalMissed, myCards, expenses, allStats, onCardClick }) {
  return (
    <div style={{animation:"slideUp .3s ease"}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginBottom:20}}>
        <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:12,padding:16,textAlign:"center"}}>
          <div style={{fontSize:24,fontWeight:800,color:"#C9A84C"}}>{fmt(totalSpent)}</div>
          <div style={{fontSize:10,color:"#666688",marginTop:4}}>Total Spent</div>
        </div>
        <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:12,padding:16,textAlign:"center"}}>
          <div style={{fontSize:24,fontWeight:800,color:"#4ADE80"}}>{fmt(totalEarned.toFixed(0))}</div>
          <div style={{fontSize:10,color:"#666688",marginTop:4}}>Earned</div>
        </div>
        <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:12,padding:16,textAlign:"center"}}>
          <div style={{fontSize:24,fontWeight:800,color:"#F87171"}}>{fmt(totalMissed.toFixed(0))}</div>
          <div style={{fontSize:10,color:"#666688",marginTop:4}}>Missed</div>
        </div>
      </div>

      <div style={{fontSize:14,fontWeight:700,marginBottom:12}}>My Cards</div>
      <div style={{display:"flex",gap:12,overflowX:"auto",paddingBottom:10,marginBottom:20}}>
        {myCards.map(cardId => {
          const card = CARD_DB[cardId];
          return card ? <CreditCardVisual key={cardId} card={card} size="mini" onClick={() => onCardClick(card)} /> : null;
        })}
      </div>

      <div style={{fontSize:14,fontWeight:700,marginBottom:12}}>Recent Transactions</div>
      {expenses.slice(0, 6).map((exp, i) => {
        const stat = allStats[i];
        return (
          <div key={exp.id} style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:10,padding:12,marginBottom:8}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <div style={{fontSize:13,fontWeight:600}}>{exp.merchant}</div>
                <div style={{fontSize:11,color:"#666688"}}>{exp.date} • {exp.category}</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontSize:16,fontWeight:700}}>{fmt(exp.amount)}</div>
                <div style={{fontSize:10,color:stat?.color}}>{stat?.emoji} {stat?.decision}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function WalletTab({ myCards, onCardClick }) {
  return (
    <div style={{animation:"slideUp .3s ease"}}>
      <div style={{fontSize:18,fontWeight:700,marginBottom:16}}>My Wallet</div>
      {myCards.map(cardId => {
        const card = CARD_DB[cardId];
        return card ? (
          <CreditCardVisual 
            key={cardId} 
            card={card} 
            size="full" 
            onClick={() => onCardClick(card)}
          />
        ) : null;
      })}
    </div>
  );
}

function SMSSyncTab({ expenses, setExpenses, myCards, smsPermission, setSmsPermission }) {
  const [smsText, setSmsText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleParse = async () => {
    setLoading(true);
    const parsed = await parseSMSWithAI(smsText);
    setLoading(false);
    
    if (parsed && !parsed.error) {
      const newExp = {
        id: `exp${Date.now()}`,
        merchant: parsed.merchant,
        amount: parsed.amount,
        category: detectCategory(parsed.merchant),
        cardId: myCards[0], // Default to first card
        date: parsed.date,
        note: "Auto-imported from SMS"
      };
      setExpenses(prev => [newExp, ...prev]);
      setSmsText("");
    }
  };

  const handleSMSPermission = async () => {
    if ('permissions' in navigator) {
      try {
        const permission = await navigator.permissions.query({name: 'sms'});
        if (permission.state === 'granted') {
          setSmsPermission(true);
          // Request notification permission as well
          if ('Notification' in window) {
            await Notification.requestPermission();
          }
        } else {
          // Show instructions for manual permission enabling
          alert('Please enable SMS permissions in your browser settings for automatic transaction sync.');
        }
      } catch (err) {
        console.log('SMS permission not available');
      }
    }
  };

  return (
    <div style={{animation:"slideUp .3s ease"}}>
      <div style={{fontSize:18,fontWeight:700,marginBottom:16}}>SMS Sync</div>
      
      {/* SMS Permission Status */}
      <div style={{background:smsPermission?"rgba(74,222,128,.1)":"rgba(251,146,60,.1)",border:smsPermission?"1px solid rgba(74,222,128,.3)":"1px solid rgba(251,146,60,.3)",borderRadius:12,padding:16,marginBottom:16}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontSize:24}}>{smsPermission ? "✅" : "📱"}</span>
          <div>
            <div style={{fontSize:14,fontWeight:600,color:smsPermission?"#4ADE80":"#FB923C"}}>
              {smsPermission ? "Auto-Sync Active" : "Enable Auto-Sync"}
            </div>
            <div style={{fontSize:12,color:"#AAAACC",marginTop:4}}>
              {smsPermission ? "Transactions will be automatically imported from SMS" : "Grant SMS permission for automatic transaction import"}
            </div>
          </div>
        </div>
        {!smsPermission && (
          <button 
            onClick={handleSMSPermission}
            style={{
              marginTop:12,background:"linear-gradient(135deg,#C9A84C,#E8C97A)",
              border:"none",borderRadius:10,padding:"12px 20px",color:"#06060F",
              fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"inherit"
            }}
          >
            Enable SMS Permissions
          </button>
        )}
      </div>

      {/* Manual SMS Input */}
      <div style={{fontSize:14,fontWeight:600,marginBottom:12}}>Manual SMS Parse</div>
      <div style={{marginBottom:12}}>
        <textarea 
          value={smsText}
          onChange={e => setSmsText(e.target.value)}
          placeholder="Paste your bank SMS here... 
Support: HDFC, SBI, ICICI, Axis, Yes Bank, Kotak, IDFC FIRST, AU Bank, IndusInd, PNB, OneCard"
          style={{
            width:"100%",background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",
            borderRadius:12,padding:16,color:"#E8E8F4",fontSize:14,fontFamily:"inherit",
            minHeight:120,resize:"none"
          }}
        />
      </div>
      <button 
        onClick={handleParse} 
        disabled={!smsText.trim() || loading}
        style={{
          width:"100%",background:"linear-gradient(135deg,#C9A84C,#E8C97A)",
          border:"none",borderRadius:12,padding:16,color:"#06060F",
          fontWeight:700,fontSize:14,cursor:"pointer",fontFamily:"inherit",
          opacity: smsText.trim() ? 1 : 0.5
        }}
      >
        {loading ? "Parsing..." : "Parse SMS"}
      </button>

      {/* Supported Banks */}
      <div style={{marginTop:20}}>
        <div style={{fontSize:12,color:"#777799",marginBottom:8}}>Supported Banks:</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
          {["HDFC","SBI","ICICI","Axis","Yes Bank","Kotak","IDFC FIRST","AU Bank","IndusInd","PNB","OneCard"].map(bank => (
            <div key={bank} style={{background:"rgba(255,255,255,.05)",padding:"4px 8px",borderRadius:6,fontSize:10,color:"#AAAACC"}}>
              {bank}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ExploreTab({ myCards, setMyCards, onCardClick }) {
  const allCards = Object.values(CARD_DB);
  
  return (
    <div style={{animation:"slideUp .3s ease"}}>
      <div style={{fontSize:18,fontWeight:700,marginBottom:16}}>Explore Cards ({allCards.length} Available)</div>
      {allCards.map(card => (
        <div key={card.id} onClick={() => onCardClick(card)} style={{
          background:`linear-gradient(135deg,${card.gradient[0]},${card.gradient[1]})`,
          border:`1px solid ${card.accent}22`,borderRadius:12,padding:16,marginBottom:12,
          cursor:"pointer",display:"flex",alignItems:"center",gap:12
        }} className="chov">
          <span style={{fontSize:28}}>{card.emoji}</span>
          <div style={{flex:1}}>
            <div style={{fontSize:14,fontWeight:700,color:"#fff"}}>{card.bank} {card.name}</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,.7)"}}>{card.type} • {card.fee}</div>
            <div style={{fontSize:10,color:"rgba(255,255,255,.5)",marginTop:2}}>{card.network} • {card.benefits.amazon}% Amazon • {card.benefits.dining}% Dining</div>
          </div>
          <div style={{
            background: myCards.includes(card.id) ? "#4ADE80" : "rgba(255,255,255,.1)",
            color: myCards.includes(card.id) ? "#06060F" : "#fff",
            padding:"6px 12px",borderRadius:8,fontSize:11,fontWeight:600
          }}>
            {myCards.includes(card.id) ? "Added" : "Add"}
          </div>
        </div>
      ))}
    </div>
  );
}

function EarnTab({ affLog }) {
  const totalEarned = affLog.reduce((sum, log) => sum + log.commission, 0);
  
  return (
    <div style={{animation:"slideUp .3s ease"}}>
      <div style={{fontSize:18,fontWeight:700,marginBottom:16}}>Affiliate Earnings</div>
      
      <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:12,padding:20,textAlign:"center",marginBottom:20}}>
        <div style={{fontSize:32,fontWeight:800,color:"#4ADE80"}}>{fmt(totalEarned)}</div>
        <div style={{fontSize:12,color:"#666688"}}>Total Commission Earned</div>
      </div>

      <div style={{fontSize:14,fontWeight:700,marginBottom:12}}>Recent Activity</div>
      {affLog.length === 0 ? (
        <div style={{textAlign:"center",padding:40,color:"#666688"}}>
          <div style={{fontSize:40,marginBottom:12}}>💳</div>
          <div>No affiliate activity yet</div>
          <div style={{fontSize:12,marginTop:6}}>Apply for cards through Explore tab to earn commissions</div>
        </div>
      ) : (
        affLog.map(log => {
          const card = CARD_DB[log.cardId];
          return card ? (
            <div key={log.id} style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:10,padding:12,marginBottom:8,display:"flex",alignItems:"center",gap:12}}>
              <span style={{fontSize:24}}>{card.emoji}</span>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:600}}>{card.name}</div>
                <div style={{fontSize:11,color:"#666688"}}>{log.network} • {new Date(log.clickedAt).toLocaleDateString()}</div>
              </div>
              <div style={{fontSize:16,fontWeight:700,color:"#4ADE80"}}>{fmt(log.commission)}</div>
            </div>
          ) : null;
        })
      )}
    </div>
  );
}

// ── MODAL COMPONENTS (Same implementations but enhanced for new cards)
function MyCardDashboard({ card, onClose }) {
  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.85)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div onClick={e => e.stopPropagation()} style={{background:"#0B0B18",border:"1px solid rgba(201,168,76,.2)",borderRadius:16,padding:24,width:"90%",maxWidth:400}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <div style={{fontSize:18,fontWeight:700}}>{card.name} Dashboard</div>
          <button onClick={onClose} style={{background:"none",border:"none",color:"#666",fontSize:20,cursor:"pointer"}}>×</button>
        </div>
        <CreditCardVisual card={card} size="full" />
        <div style={{marginTop:20}}>
          <div style={{fontSize:14,fontWeight:600,marginBottom:8}}>Benefits Breakdown</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,fontSize:11,color:"#AAAACC"}}>
            <div>Amazon: {card.benefits.amazon}%</div>
            <div>Flipkart: {card.benefits.flipkart}%</div>
            <div>Dining: {card.benefits.dining}%</div>
            <div>Travel: {card.benefits.travel}%</div>
            <div>Fuel: {card.benefits.fuel}%</div>
            <div>Online: {card.benefits.online}%</div>
          </div>
          <div style={{marginTop:12,padding:12,background:"rgba(255,255,255,.03)",borderRadius:8}}>
            <div style={{fontSize:12,fontWeight:600,marginBottom:6,color:card.ltf?"#4ADE80":card.accent}}>
              {card.ltf ? "Lifetime Free" : `Annual Fee: ${card.fee}`}
            </div>
            <div style={{fontSize:11,color:"#888899"}}>Network: {card.network}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardModal({ card, owned, onClose, onAdd, onAffiliate }) {
  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.85)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div onClick={e => e.stopPropagation()} style={{background:"#0B0B18",border:"1px solid rgba(201,168,76,.2)",borderRadius:16,padding:24,width:"90%",maxWidth:400,maxHeight:"80vh",overflowY:"auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <div style={{fontSize:18,fontWeight:700}}>{card.name}</div>
          <button onClick={onClose} style={{background:"none",border:"none",color:"#666",fontSize:20,cursor:"pointer"}}>×</button>
        </div>
        <CreditCardVisual card={card} size="full" />
        <div style={{marginTop:20}}>
          <div style={{fontSize:14,fontWeight:600,marginBottom:8}}>Key Benefits</div>
          <div style={{fontSize:12,color:"#AAAACC",marginBottom:16}}>
            {card.perks.slice(0,3).map((perk,i) => (
              <div key={i} style={{marginBottom:4}}>• {perk}</div>
            ))}
          </div>
          <div style={{display:"flex",gap:8}}>
            <button 
              onClick={owned ? () => {} : onAdd}
              style={{
                flex:1,background:owned?"rgba(74,222,128,.2)":"linear-gradient(135deg,#C9A84C,#E8C97A)",
                border:"none",borderRadius:10,padding:12,color:owned?"#4ADE80":"#06060F",
                fontWeight:700,cursor:"pointer",fontFamily:"inherit"
              }}
            >
              {owned ? "Added to Wallet" : "Add to Wallet"}
            </button>
            {AFF[card.id] && (
              <button 
                onClick={() => onAffiliate(AFF[card.id].url)}
                style={{
                  flex:1,background:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.2)",
                  borderRadius:10,padding:12,color:"#E8E8F4",fontWeight:600,cursor:"pointer",fontFamily:"inherit"
                }}
              >
                Apply ({fmt(AFF[card.id].commission)})
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function AddCardModal({ myCards, setMyCards, onClose }) {
  const availableCards = Object.values(CARD_DB).filter(card => !myCards.includes(card.id));
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredCards = availableCards.filter(card => 
    card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.bank.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.type.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.85)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div onClick={e => e.stopPropagation()} style={{background:"#0B0B18",border:"1px solid rgba(201,168,76,.2)",borderRadius:16,padding:24,width:"90%",maxWidth:400,maxHeight:"80vh",overflowY:"auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <div style={{fontSize:18,fontWeight:700}}>Add Card</div>
          <button onClick={onClose} style={{background:"none",border:"none",color:"#666",fontSize:20,cursor:"pointer"}}>×</button>
        </div>
        
        <input 
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search cards..."
          style={{
            width:"100%",background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",
            borderRadius:8,padding:12,color:"#E8E8F4",fontSize:14,fontFamily:"inherit",marginBottom:16
          }}
        />
        
        {filteredCards.map(card => (
          <div 
            key={card.id} 
            onClick={() => {
              setMyCards([...myCards, card.id]);
              onClose();
            }}
            style={{
              background:`linear-gradient(135deg,${card.gradient[0]},${card.gradient[1]})`,
              border:`1px solid ${card.accent}22`,borderRadius:10,padding:12,marginBottom:8,
              cursor:"pointer",display:"flex",alignItems:"center",gap:10
            }}
            className="chov"
          >
            <span style={{fontSize:20}}>{card.emoji}</span>
            <div>
              <div style={{fontSize:13,fontWeight:600,color:"#fff"}}>{card.bank} {card.name}</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,.7)"}}>{card.type} • {card.network}</div>
            </div>
          </div>
        ))}
        {filteredCards.length === 0 && (
          <div style={{textAlign:"center",padding:20,color:"#666688"}}>
            No cards found matching "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
}

function AddExpenseModal({ expenses, setExpenses, myCards, onClose }) {
  const [merchant, setMerchant] = useState("");
  const [amount, setAmount] = useState("");
  const [cardId, setCardId] = useState(myCards[0] || "");
  
  const handleAdd = () => {
    if (!merchant || !amount || !cardId) return;
    
    const newExp = {
      id: `exp${Date.now()}`,
      merchant,
      amount: parseFloat(amount),
      category: detectCategory(merchant),
      cardId,
      date: new Date().toISOString().split('T')[0],
      note: ""
    };
    
    setExpenses([newExp, ...expenses]);
    onClose();
  };
  
  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.85)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div onClick={e => e.stopPropagation()} style={{background:"#0B0B18",border:"1px solid rgba(201,168,76,.2)",borderRadius:16,padding:24,width:"90%",maxWidth:400}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <div style={{fontSize:18,fontWeight:700}}>Add Expense</div>
          <button onClick={onClose} style={{background:"none",border:"none",color:"#666",fontSize:20,cursor:"pointer"}}>×</button>
        </div>
        
        <div style={{marginBottom:16}}>
          <input 
            value={merchant}
            onChange={e => setMerchant(e.target.value)}
            placeholder="Merchant name"
            style={{
              width:"100%",background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",
              borderRadius:8,padding:12,color:"#E8E8F4",fontSize:14,fontFamily:"inherit"
            }}
          />
        </div>
        
        <div style={{marginBottom:16}}>
          <input 
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="Amount"
            type="number"
            style={{
              width:"100%",background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",
              borderRadius:8,padding:12,color:"#E8E8F4",fontSize:14,fontFamily:"inherit"
            }}
          />
        </div>
        
        <div style={{marginBottom:20}}>
          <select 
            value={cardId}
            onChange={e => setCardId(e.target.value)}
            style={{
              width:"100%",background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",
              borderRadius:8,padding:12,color:"#E8E8F4",fontSize:14,fontFamily:"inherit"
            }}
          >
            {myCards.map(id => {
              const card = CARD_DB[id];
              return card ? <option key={id} value={id}>{card.bank} {card.name}</option> : null;
            })}
          </select>
        </div>
        
        <button 
          onClick={handleAdd}
          style={{
            width:"100%",background:"linear-gradient(135deg,#C9A84C,#E8C97A)",
            border:"none",borderRadius:10,padding:12,color:"#06060F",
            fontWeight:700,fontSize:14,cursor:"pointer",fontFamily:"inherit"
          }}
        >
          Add Expense
        </button>
      </div>
    </div>
  );
}