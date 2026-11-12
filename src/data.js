export const PHONE='5491138437425';
export const categories=[
 {id:'tv',name:'Televisores',label:'Nuevos y Outlet',emoji:'📺'},
 {id:'remotes',name:'Controles remotos',label:'',emoji:'🎛️'},
 {id:'cables',name:'Cables y accesorios',label:'',emoji:'🔌'},
 {id:'mobile',name:'Accesorios para celulares',label:'',emoji:'📱'},
 {id:'computer',name:'Computación y periféricos',label:'',emoji:'🖥️'},
 {id:'supports',name:'Soportes para TV',label:'',emoji:'🛠️'},
 {id:'lighting',name:'Iluminación RGB',label:'',emoji:'💡'}
];
export const remoteTypes=[
 {id:'tube',name:'TV de tubo (TRC)',prefixes:['TV']},
 {id:'smart',name:'LED, Smart, Android y Google TV',prefixes:['LCD','IRF','RF']},
 {id:'voice',name:'Comando de voz',prefixes:['IRF','RF']},
 {id:'air',name:'Aire acondicionado',prefixes:['AR']},
 {id:'deco',name:'Decodificadores y TV Box',prefixes:['SIN','OR']},
 {id:'bluray',name:'DVD y Blu-ray',prefixes:['BLU']},
 {id:'audio',name:'Equipos de audio',prefixes:['AUD']},
 {id:'home',name:'Home Theater',prefixes:['HOM']},
 {id:'projector',name:'Proyectores',prefixes:['PRO']},
 {id:'car',name:'Autoestéreos',prefixes:['CAR']}
];
export const priceGroups={standard:{list:18000,cash:14000},air:{list:20000,cash:16000},voice:{list:30000,cash:26000}};
export function groupFor(code=''){ const pref=String(code).split('-')[0].toUpperCase(); return pref==='AR'?'air':(['IRF','RF'].includes(pref)?'voice':'standard'); }
export function defaultPrices(code){return priceGroups[groupFor(code)];}
export const money=n=>new Intl.NumberFormat('es-AR',{style:'currency',currency:'ARS',maximumFractionDigits:0}).format(Number(n)||0);
export const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toUpperCase().replace(/\s+/g,' ').trim();
export const whatsapp=(message)=>`https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
export const demoProducts=[
 {id:'LCD-520',sku:'LCD-520',name:'Control remoto Samsung LCD-520',category:'remotes',remoteType:'smart',brands:['Samsung'],priceCash:14000,priceList:18000,status:'published',availability:'ask',featured:true,image:'/assets/controles/LCD-520.webp'},
 {id:'LCD-590',sku:'LCD-590',name:'Control remoto Samsung LCD-590',category:'remotes',remoteType:'smart',brands:['Samsung'],priceCash:14000,priceList:18000,status:'published',availability:'ask',featured:true,image:'/assets/controles/LCD-590.webp'},
 {id:'IRF-301',sku:'IRF-301',name:'Control remoto Samsung con voz IRF-301',category:'remotes',remoteType:'voice',brands:['Samsung'],priceCash:26000,priceList:30000,status:'published',availability:'ask',featured:true,image:'/assets/controles/IRF-301.webp'},
 {id:'TV-181',sku:'TV-181',name:'Control remoto Samsung TV-181',category:'remotes',remoteType:'tube',brands:['Samsung'],priceCash:14000,priceList:18000,status:'published',availability:'ask',featured:false,image:'/assets/controles/TV-181.webp'},
 {id:'AR-857',sku:'AR-857',name:'Control remoto aire Samsung AR-857',category:'remotes',remoteType:'air',brands:['Samsung'],priceCash:16000,priceList:20000,status:'published',availability:'ask',featured:false,image:'/assets/controles/AR-857.webp'},
 {id:'LCD-423',sku:'LCD-423',name:'Control remoto LG LCD-423',category:'remotes',remoteType:'smart',brands:['LG'],priceCash:14000,priceList:18000,status:'published',availability:'ask',featured:true,image:'/assets/controles/LCD-423.webp'},
 {id:'LCD-404',sku:'LCD-404',name:'Control remoto LG LCD-404',category:'remotes',remoteType:'smart',brands:['LG'],priceCash:14000,priceList:18000,status:'published',availability:'ask',featured:false,image:'/assets/controles/LCD-404.webp'},
 {id:'BLU-601',sku:'BLU-601',name:'Control remoto Samsung Blu-ray BLU-601',category:'remotes',remoteType:'bluray',brands:['Samsung'],priceCash:14000,priceList:18000,status:'published',availability:'ask',featured:false,image:'/assets/controles/BLU-601.webp'},
 {id:'HOM-608',sku:'HOM-608',name:'Control remoto Samsung Home Theater HOM-608',category:'remotes',remoteType:'home',brands:['Samsung'],priceCash:14000,priceList:18000,status:'published',availability:'ask',featured:false,image:'/assets/controles/HOM-608.webp'},
 {id:'SIN-910',sku:'SIN-910',name:'Control remoto DTV SIN-910',category:'remotes',remoteType:'deco',brands:['DTV'],priceCash:14000,priceList:18000,status:'published',availability:'ask',featured:false,image:'/assets/controles/SIN-910.webp'},
 {id:'OR-37',sku:'OR-37',name:'Control remoto decodificadores OR-37',category:'remotes',remoteType:'deco',brands:['Cablevisión','Motorola','Telecentro'],priceCash:14000,priceList:18000,status:'published',availability:'ask',featured:false,image:'/assets/controles/OR-37.webp'},
 {id:'RF-659',sku:'RF-659',name:'Control remoto Xiaomi TV con voz RF-659',category:'remotes',remoteType:'voice',brands:['Xiaomi'],priceCash:26000,priceList:30000,status:'published',availability:'ask',featured:false,image:'/assets/controles/RF-659.webp'}
];
