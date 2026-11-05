(() => {
'use strict';
const $=id=>document.getElementById(id);
const slides=[...document.querySelectorAll('.slide')];
const notes={
  "inicio": [
    "Haz",
    "Pregunta qué perderían si no pudieran entrar en su cuenta. Recoge dos respuestas, pulsa una de las tres opciones y lee su «Imagina que…». Pide una consecuencia; basta con comentar uno o dos casos.",
    "Explica",
    "Hoy vamos a proteger el acceso a las cuentas, el contenido de los mensajes y los archivos que queremos conservar. Cada problema necesita medidas adecuadas.",
    "Comprueba",
    "Pregunta: «Si alguien entra en tu cuenta y se hace pasar por ti, ¿a quién más puede afectar?». Buscamos que relacionen la seguridad con sus amistades, su privacidad y su trabajo."
  ],
  "claves": [
    "Haz",
    "Señala «16+ caracteres» y los cuatro tipos: mayúsculas, minúsculas, números y símbolos. Después pide que observen Casa2026! y digan por qué sigue siendo predecible.",
    "Explica",
    "Una contraseña debe ser larga, difícil de adivinar y distinta para cada cuenta. Mezclar tipos aporta variedad, pero una palabra común con el año y una exclamación sigue un patrón. Un gestor ayuda a generar y guardar claves distintas.",
    "Comprueba",
    "Pregunta: «¿Basta con añadir un símbolo a una contraseña fácil?». La respuesta es no: también importan la longitud y que no siga patrones previsibles."
  ],
  "clasificar": [
    "Haz",
    "La clase decide dónde va cada ejemplo y justifica su elección. Arrastra las seis tarjetas, pulsa «Comprobar» y abre la explicación de las que hayan generado dudas. Si hay errores, cambiadlas de columna y comprobad de nuevo.",
    "Explica",
    "ts.&6+Bu mezcla los cuatro tipos, pero solo tiene ocho caracteres. Repetir dieciséis veces la misma letra tampoco crea una buena contraseña. Los ejemplos son públicos: no se usan en cuentas.",
    "Comprueba",
    "Quedan en FUERTES vR7!pL2#sT9@kM4? y Nuez-Tren-Lago-Faro-8; las otras cuatro, en DÉBILES. Pide justificar por qué una contraseña corta puede seguir siendo débil aunque tenga símbolos."
  ],
  "laboratorio": [
    "Haz",
    "Prueba Casa2026! y después «Cuatro palabras». Antes de cada prueba, pide que anticipen el resultado. Acepta una mejora inventada por la clase y marca el supuesto de reutilización. Nunca utilicéis contraseñas reales.",
    "Explica",
    "El indicador orienta sobre longitud y patrones; no garantiza la seguridad. Una contraseña repetida permite que un robo en un servicio afecte también a otras cuentas.",
    "Comprueba",
    "Pregunta: «¿Qué mejoraríamos además de añadir un símbolo?». Esperamos: hacerla más larga e imprevisible y usar una distinta para cada cuenta."
  ],
  "segunda-barrera": [
    "Haz",
    "Lee el SMS y pide tres señales de alerta. Pulsa la amenaza de bloqueo, el enlace y la petición del código. Votad qué haríais y elegid «Comprobar desde la app oficial» para mostrar los dos pasos.",
    "Explica",
    "Un aviso urgente puede ser una trampa. La verificación en dos pasos añade, por ejemplo, un código de una app de autenticación a tu contraseña. Ese código solo se usa en el acceso oficial que has iniciado.",
    "Comprueba",
    "Pregunta: «¿Enviaríamos el código a quien nos lo pide por un mensaje?». No. Nos paramos y comprobamos el aviso desde la app o web oficial abierta por nuestra cuenta."
  ],
  "mensajes": [
    "Haz",
    "Anuncia: «Pasamos a proteger el contenido de los mensajes». Lee el título y señala el sobre cerrado para presentar el nuevo bloque.",
    "Explica",
    "Queremos que el mensaje llegue a su destinatario sin que cualquiera que lo intercepte pueda entender su contenido. Para eso sirve el cifrado.",
    "Continúa",
    "Pregunta: «Si alguien intercepta el mensaje, ¿debería poder leerlo?». Recoge una respuesta y avanza para comparar los dos envíos."
  ],
  "cifrar": [
    "Haz",
    "Señala el aviso de WhatsApp y pregunta si lo reconocen. Pulsa «Enviar sin cifrar» y observad a quien intercepta. Después pulsa «Enviar cifrado» y comparad lo que ven el observador y el destinatario.",
    "Explica",
    "Cifrar transforma el contenido con una clave para ocultarlo durante el envío. El destinatario usa la clave adecuada para recuperarlo. En los chats personales con cifrado de extremo a extremo, se lee en los dispositivos de la conversación.",
    "Presenta a César",
    "Lee la pregunta sobre la antigua Roma. Explica que Julio César ocultaba correspondencia confidencial cambiando letras. Avanza para probar ese método sencillo y entender la idea de clave."
  ],
  "simulador": [
    "Haz",
    "Muestra HOLA con clave 3: KRÑD. Señala A arriba y D debajo. Cambia la clave a 1, vuelve a 3 y pulsa «Descifrar este resultado» para recuperar HOLA.",
    "Explica",
    "Esto es el cifrado César: la clave indica cuántas posiciones desplazamos las letras. Para descifrar se hace el recorrido inverso. Usamos la Ñ como adaptación a nuestro alfabeto.",
    "Comprueba",
    "Pregunta: «¿Qué necesita saber quien recibe el mensaje?». El mismo alfabeto y la clave. Fue útil para ocultar mensajes, pero hoy resulta fácil probar sus veintiséis desplazamientos posibles."
  ],
  "papel": [
    "Haz",
    "Reparte un juego de dos tiras por pareja y alinead D debajo de A. A escribe dos a cuatro palabras, las cifra y pasa el mensaje a B. B lo descifra, comparan con el original y después cambian de función.",
    "Explica",
    "Para cifrar, se busca arriba y se lee abajo; para descifrar, se busca abajo y se lee arriba. El original queda apartado hasta la comprobación. Conservamos Ñ y espacios y escribimos sin tildes.",
    "Comprueba",
    "Pide a una pareja mostrar HOLA → KRÑD → HOLA. Si no coincide, revisad la clave, la Ñ y la dirección de lectura. Quien termine puede repetir con clave 5."
  ],
  "hoy": [
    "Haz",
    "Pulsa las tres escenas y pregunta quién puede leer los datos en cada una. Usa «Ver la comparación completa» si necesitas apoyarte en la infografía.",
    "Explica",
    "Chat personal: el contenido se lee en los dispositivos de la conversación. HTTPS: protege el trayecto hasta la web, que recibe los datos. Dispositivo cifrado: ayuda a proteger los archivos guardados si se pierde.",
    "Comprueba",
    "Pregunta: «¿Una web con candado puede ser engañosa? ¿El receptor puede compartir una captura?». Sí en ambos casos. Cifrar protege el contenido, pero no garantiza que la web o la persona sean fiables."
  ],
  "prevenir": [
    "Haz",
    "Señala una medida de cada lado de la infografía. Retoma el caso del portátil que se estropea: pregunta qué habríamos preparado para poder recuperar el trabajo.",
    "Explica",
    "La seguridad activa reduce el riesgo: contraseñas únicas, verificación en dos pasos y actualizaciones. La seguridad pasiva reduce el daño: una copia separada y comprobar que podemos restaurarla.",
    "Comprueba",
    "Pregunta: «¿Cuándo hacemos la copia?». Antes de que ocurra el problema, aunque nos ayude después. Otra carpeta en el mismo equipo no basta si se pierde o avería ese equipo."
  ],
  "conecta": [
    "Haz",
    "Pide una propuesta y su motivo antes de unir. Pulsa una medida y después su efecto. Comprueba las tres conexiones de la primera ronda y pasa a las dos de la segunda; las flechas se pueden corregir.",
    "Explica",
    "La primera ronda reúne medidas para prevenir: limitar el efecto de una filtración, añadir protección al acceso y corregir fallos. La segunda prepara la recuperación con una copia separada y una prueba de restauración.",
    "Comprueba",
    "Soluciones: 1–C, 2–E y 3–B; después, 4–A y 5–D. Pide justificar una conexión: «¿Cómo ayuda esa medida?». Acertar la flecha debe ir acompañado de una explicación."
  ],
  "cierre": [
    "Haz",
    "Lee cada pregunta, recoge una respuesta y después pulsa la tarjeta para comentarla. Así la explicación aparece tras la participación de la clase.",
    "Explica",
    "Añadir 123! no elimina los patrones. César se descifra probando pocas claves. Una copia en el mismo equipo puede perderse con él. Proteger el acceso, cifrar el contenido y preparar copias cubren problemas distintos.",
    "Cierra",
    "Pide completar: «Esta semana voy a… para proteger…». Dos voluntarios comparten una mejora que puedan aplicar con ayuda en casa."
  ]
};
let current=0;
const dots=$('dots');
slides.forEach((s,i)=>{const b=document.createElement('button');b.setAttribute('aria-label',`Ir a pantalla ${i+1}: ${s.dataset.label}`);b.addEventListener('click',()=>go(i));dots.append(b);});
function clearPassword(){ $('password-demo').value='';$('pw-reused').checked=false;analysePassword(); }
function go(n){n=Math.max(0,Math.min(slides.length-1,n));if(slides[current]?.id==='laboratorio'&&slides[n].id!=='laboratorio')clearPassword();current=n;slides.forEach((s,i)=>s.hidden=i!==n);$('phase-label').textContent=slides[n].dataset.label;$('page-count').textContent=`${n+1} / ${slides.length}`;[...dots.children].forEach((b,i)=>{b.classList.toggle('visited',i<n);i===n?b.setAttribute('aria-current','step'):b.removeAttribute('aria-current');});$('previous').disabled=n===0;$('next').disabled=n===slides.length-1;$('next').textContent=n===0?'Comenzar →':'Siguiente →';history.replaceState(null,'','#'+slides[n].id);window.scrollTo({top:0});$('app-status').textContent=`Pantalla ${n+1}: ${slides[n].dataset.label}`;if(slides[n].id==='conecta')requestAnimationFrame(drawConnections);}
$('next').addEventListener('click',()=>go(current+1));$('previous').addEventListener('click',()=>go(current-1));$('restart').addEventListener('click',()=>{resetMatch();resetOpening();go(0);});document.querySelector('.brand').addEventListener('click',e=>{e.preventDefault();go(0);});
document.addEventListener('keydown',e=>{if(document.querySelector('dialog[open]')||e.altKey||e.ctrlKey||e.metaKey||/INPUT|TEXTAREA|SELECT/.test(e.target.tagName))return;if(e.key==='ArrowRight'){e.preventDefault();go(current+1);}if(e.key==='ArrowLeft'){e.preventDefault();go(current-1);}});
$('fullscreen').addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch{$('app-status').textContent='El navegador no permite pantalla completa. Puedes usar F11.';}});
function formatDuration(m){const seconds=Math.round(m*60);return seconds<60?`${seconds} s`:seconds%60?`${Math.floor(seconds/60)} min ${seconds%60} s`:`${seconds/60} min`;}
function formatElapsed(m){const seconds=Math.round(m*60);return `${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')}`;}
$('guide').addEventListener('click',()=>{const n=notes[slides[current].id];$('guide-title').textContent=slides[current].dataset.label;const start=slides.slice(0,current).reduce((a,s)=>a+Number(s.dataset.time),0);const duration=Number(slides[current].dataset.time);const timing=document.createElement('p');timing.className='guide-time';timing.textContent=`Tiempo orientativo: ${formatDuration(duration)} · ${formatElapsed(start)}–${formatElapsed(start+duration)} del taller`;$('guide-content').replaceChildren(timing);for(let i=0;i<n.length;i+=2){const box=document.createElement('div');box.className='guide-block '+(i===4?'answer':'');const h=document.createElement('h3');h.textContent=`${i/2+1} · ${n[i]}`;const p=document.createElement('p');p.textContent=n[i+1];box.append(h,p);$('guide-content').append(box);}$('guide-dialog').showModal();});
$('prepare').addEventListener('click',()=>$('prepare-dialog').showModal());document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));document.querySelectorAll('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d)d.close();}));document.querySelectorAll('[data-zoom]').forEach(b=>b.addEventListener('click',()=>{$('zoom-image').src=b.querySelector('img')?.src||b.dataset.zoom;$('zoom-image').alt=b.dataset.zoomAlt||b.querySelector('img')?.alt||'Comparación de cifrado en chats, conexiones y archivos';$('zoom-dialog').showModal();}));
const openingStories={"cuenta": "Alguien entra en tu cuenta de un juego, cambia la contraseña y manda mensajes haciéndose pasar por ti.", "mensajes": "En un chat sin cifrado dices dónde y a qué hora quedáis. Alguien intercepta el mensaje y puede leerlo.", "archivos": "Tu portátil se estropea la víspera de entregar un vídeo que lleváis días preparando. La única copia estaba allí."};
const opening={cuenta:'Una contraseña distinta y la verificación en dos pasos ayudan a proteger el acceso.',mensajes:'El cifrado ayuda a proteger el contenido. El destinatario puede leerlo y compartirlo.',archivos:'Una copia separada puede permitir recuperar el trabajo si se pierde el original.'};document.querySelectorAll('[data-opening]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-opening]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));$('opening-feedback').textContent=opening[b.dataset.opening];$('opening-story').textContent=openingStories[b.dataset.opening];$('opening-scenario').hidden=false;}));
function resetOpening(){$('opening-scenario').hidden=true;$('opening-story').textContent='';$('opening-feedback').textContent='Votad y explicad una consecuencia. Hoy vamos a proteger las tres cosas.';document.querySelectorAll('[data-opening]').forEach(b=>b.setAttribute('aria-pressed','false'));}
// El texto de entrada solo vive en el campo y en esta llamada. No hay almacenamiento ni peticiones de red.
const contextWords=['contraseña','contrasena','colegio','instituto','santo','domingo','maria','javier','lucia','pablo','almeria','granada','sevilla','casa','futbol','verano','hola'];
function analysePassword(){const text=$('password-demo').value;const size=Array.from(text).length;$('pw-length').textContent=String(size);const types=[['Mayúsculas',/\p{Lu}/u.test(text)],['Minúsculas',/\p{Ll}/u.test(text)],['Números',/\p{N}/u.test(text)],['Símbolos',/[^\p{L}\p{N}\s]/u.test(text)]];$('pw-types').replaceChildren();types.forEach(([name,present])=>{const s=document.createElement('span');s.textContent=(present?'✓ ':'— ')+name;if(present)s.className='present';$('pw-types').append(s);});let score=0;if(!text){$('pw-rating').textContent='Esperando un ejemplo';$('pw-feedback').textContent='Primero predecid el resultado. Después observad longitud, tipos y patrones.';}else if(typeof window.zxcvbn!=='function'){$('pw-rating').textContent='Estimador no disponible';$('pw-feedback').textContent='Observad la longitud y los tipos. Abre el paquete completo para usar la estimación de patrones.';}else{const result=window.zxcvbn(text,contextWords);score=result.score;$('pw-rating').textContent=['Muy baja','Baja','Media','Alta','Muy alta'][score]+' · orientativa';const patterns=result.sequence.filter(s=>s.token.length>=3);const reasons=[];if(size<16)reasons.push('Por debajo de 16 caracteres.');if(patterns.some(s=>s.pattern==='repeat'))reasons.push('Repetir caracteres crea un patrón fácil de probar.');if(patterns.some(s=>['sequence','spatial','date'].includes(s.pattern)))reasons.push('Reconoce una secuencia, fecha o recorrido de teclado.');if(patterns.some(s=>s.pattern==='dictionary'))reasons.push('Contiene patrones previsibles: añadir números o símbolos no basta.');if(!reasons.length)reasons.push('Sin patrones evidentes para este estimador. Debe seguir siendo secreta y distinta en cada cuenta.');if($('pw-reused').checked)reasons.unshift('Una contraseña repetida pone varias cuentas en riesgo.');$('pw-feedback').textContent=reasons.slice(0,2).join(' ');}$('pw-meter').setAttribute('aria-valuenow',String(score));$('pw-meter').setAttribute('aria-valuetext',text?$('pw-rating').textContent:'Sin ejemplo');$('pw-meter').style.setProperty('--meter',score<2?'#ffb5a6':score<3?'#f8dd62':'#7ce9df');[...$('pw-meter').children].forEach((p,i)=>p.classList.toggle('active',!!text&&i<=score));}
$('password-demo').addEventListener('input',analysePassword);$('pw-reused').addEventListener('change',analysePassword);$('clear-password').addEventListener('click',clearPassword);document.querySelectorAll('[data-password]').forEach(b=>b.addEventListener('click',()=>{$('password-demo').value=b.dataset.password;analysePassword();}));
function normal(text){return text.toUpperCase().normalize('NFD').replace(/[\u0301\u0308]/g,'').normalize('NFC');}
const alpha=Cesar.alphabet;[...alpha].forEach(ch=>{const s=document.createElement('span');s.textContent=ch;$('alpha-original').append(s);});[...(alpha.repeat(3))].forEach(ch=>{const s=document.createElement('span');s.textContent=ch;$('alpha-shifted').append(s);});let key=3,decrypt=false;
function updateCipher(){const raw=normal($('cipher-input').value);const output=Cesar.shift(raw,decrypt?-key:key);$('cipher-output').textContent=output||'Escribe un mensaje inventado';$('cipher-input-label').textContent=decrypt?'Mensaje cifrado':'Mensaje original';$('cipher-output-label').textContent=decrypt?'Mensaje descifrado':'Mensaje cifrado';$('cipher-direction').textContent=decrypt?'Descifrar: busca abajo y lee arriba.':'Cifrar: busca arriba y lee abajo.';$('alpha-shifted').style.transform=`translateX(-${key*100/81}%)`;$('key-number').value=String(key);$('key-slider').value=String(key);$('encrypt').setAttribute('aria-pressed',String(!decrypt));$('decrypt').setAttribute('aria-pressed',String(decrypt));$('key-minus').disabled=key===1;$('key-plus').disabled=key===26;$('swap-cipher').disabled=!raw.trim();$('swap-cipher').textContent=decrypt?'Volver a cifrar ↔':'Descifrar este resultado ↔';}
function setKey(value){const n=Number(value);if(!Number.isFinite(n))return;key=Math.max(1,Math.min(26,Math.round(n)));updateCipher();}
$('key-number').addEventListener('input',e=>{if(e.target.value!=='')setKey(e.target.value);});$('key-number').addEventListener('change',e=>setKey(e.target.value));$('key-slider').addEventListener('input',e=>setKey(e.target.value));$('key-minus').addEventListener('click',()=>setKey(key-1));$('key-plus').addEventListener('click',()=>setKey(key+1));$('cipher-input').addEventListener('input',updateCipher);$('cipher-input').addEventListener('blur',()=>{$('cipher-input').value=normal($('cipher-input').value);updateCipher();});$('encrypt').addEventListener('click',()=>{decrypt=false;updateCipher();});$('decrypt').addEventListener('click',()=>{decrypt=true;updateCipher();});$('swap-cipher').addEventListener('click',()=>{const output=Cesar.shift(normal($('cipher-input').value),decrypt?-key:key);$('cipher-input').value=output;decrypt=!decrypt;updateCipher();});$('reset-cipher').addEventListener('click',()=>{key=3;decrypt=false;$('cipher-input').value='HOLA';updateCipher();});
const today={chat:'En un chat personal con cifrado de extremo a extremo, el contenido se lee en los dispositivos del chat. El receptor puede hacer una captura.',web:'HTTPS usa TLS para proteger el trayecto hasta la web. La web recibe los datos; comprueba también su dirección y fiabilidad.',files:'El cifrado del dispositivo puede proteger archivos guardados si se pierde. Hace falta un desbloqueo seguro; un equipo ya desbloqueado permite ver su contenido.'};document.querySelectorAll('[data-today]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-today]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));$('today-feedback').textContent=today[b.dataset.today];}));
const sourceButtons=[...document.querySelectorAll('[data-source]')],targetButtons=[...document.querySelectorAll('[data-target]')];
const rounds=[['unique','mfa','update'],['backup','restore']];let matchRound=0,selected=null;const validatedRounds=new Set(),connections=new Map();
function renderRound(){const active=rounds[matchRound];sourceButtons.forEach(b=>b.hidden=!active.includes(b.dataset.source));targetButtons.forEach(b=>b.hidden=!active.includes(b.dataset.target));const order=matchRound===0?['update','unique','mfa']:['restore','backup'];order.forEach(t=>document.querySelector('.match-targets').append(targetButtons.find(b=>b.dataset.target===t)));document.querySelectorAll('.match-sources,.match-targets').forEach(c=>c.style.gridTemplateRows=`repeat(${active.length},minmax(85px,1fr))`);$('match-round').textContent=`Ronda ${matchRound+1} de 2`;$('match-prev').disabled=matchRound===0;$('match-next').disabled=matchRound===1;selected=null;matchState();$('match-feedback').textContent=matchRound===0?'Conectad estas tres medidas de prevención.':'Conectad estas dos medidas para preparar la recuperación.';}
function matchState(){sourceButtons.forEach(b=>{const s=b.dataset.source,checked=validatedRounds.has(rounds.findIndex(r=>r.includes(s)));b.setAttribute('aria-pressed',String(s===selected));b.classList.toggle('connected',connections.has(s));b.classList.toggle('right',checked&&connections.get(s)===s);b.classList.toggle('wrong',checked&&connections.has(s)&&connections.get(s)!==s);b.setAttribute('aria-label',b.textContent+(connections.has(s)?' · conectado a '+targetButtons.find(t=>t.dataset.target===connections.get(s)).textContent:''));});targetButtons.forEach(b=>{b.classList.toggle('connected',[...connections.values()].includes(b.dataset.target));b.setAttribute('aria-pressed','false');});drawConnections();}
sourceButtons.forEach(b=>b.addEventListener('click',()=>{selected=b.dataset.source;validatedRounds.delete(matchRound);$('match-feedback').textContent='Ahora pulsa el efecto que corresponde a la medida '+b.textContent.split(' · ')[0]+'.';matchState();}));targetButtons.forEach(b=>b.addEventListener('click',()=>{if(!selected){$('match-feedback').textContent='Selecciona primero una medida en la columna izquierda.';return;}for(const [s,t] of connections){if(t===b.dataset.target&&s!==selected)connections.delete(s);}connections.set(selected,b.dataset.target);selected=null;validatedRounds.delete(matchRound);matchState();const remaining=rounds[matchRound].filter(s=>!connections.has(s)).length;$('match-feedback').textContent=remaining?`Faltan ${remaining} conexiones en esta ronda.`:'Ronda conectada. Pulsad comprobar y justificad una flecha.';}));
function drawConnections(){if(slides[current].id!=='conecta')return;const root=$('match-board').getBoundingClientRect();const g=$('line-group');g.replaceChildren();for(const [source,target] of connections){if(!rounds[matchRound].includes(source))continue;const a=sourceButtons.find(b=>b.dataset.source===source).getBoundingClientRect(),b=targetButtons.find(b=>b.dataset.target===target).getBoundingClientRect();const x1=a.right-root.left,y1=a.top+a.height/2-root.top,x2=b.left-root.left,y2=b.top+b.height/2-root.top,mid=(x1+x2)/2;const path=document.createElementNS('http://www.w3.org/2000/svg','path');path.setAttribute('class','connection');path.setAttribute('d',`M${x1},${y1} C${mid},${y1} ${mid},${y2} ${x2},${y2}`);path.setAttribute('marker-end','url(#arrow)');if(validatedRounds.has(matchRound))path.style.stroke=source===target?'#7ce9df':'#ffb5a6';g.append(path);}}
$('check-match').addEventListener('click',()=>{const active=rounds[matchRound],remaining=active.filter(s=>!connections.has(s)).length;if(remaining){$('match-feedback').textContent=`Conectad las ${remaining} medidas que faltan en esta ronda.`;return;}validatedRounds.add(matchRound);const right=active.filter(s=>connections.get(s)===s).length;matchState();if(right<active.length){$('match-feedback').textContent=`${right} de ${active.length} correctas. Revisad los bordes coral y cambiad las flechas necesarias.`;return;}$('match-feedback').textContent=matchRound===0?'✓ 3 de 3. Estas medidas previenen. Pasad a la ronda 2.':'✓ 2 de 2. Estas medidas preparan la recuperación. ¿Por qué hacemos la copia antes?';});function resetMatch(){selected=null;validatedRounds.clear();connections.clear();matchRound=0;renderRound();}$('reset-match').addEventListener('click',resetMatch);$('match-next').addEventListener('click',()=>{matchRound=1;renderRound();});$('match-prev').addEventListener('click',()=>{matchRound=0;renderRound();});new ResizeObserver(drawConnections).observe($('match-board'));renderRound();
const exits=['No basta. Busca longitud, variedad e imprevisibilidad, y usa una contraseña distinta para cada cuenta. Un gestor puede ayudarte.','No. César con Ñ solo tiene 26 desplazamientos útiles. Hoy se usan algoritmos y sistemas mucho más resistentes.','No cubre la pérdida o avería del equipo. Prepara una copia separada y comprueba que puedes recuperar los archivos.'];document.querySelectorAll('[data-exit]').forEach(b=>b.addEventListener('click',()=>{$('exit-feedback').textContent=exits[Number(b.dataset.exit)];b.querySelector('em').textContent='Respuesta comentada ✓';}));
analysePassword();updateCipher();window.addEventListener('load',()=>window.scrollTo({top:0}));const initial=slides.findIndex(s=>s.id===location.hash.slice(1));go(initial<0?0:initial);
})();
