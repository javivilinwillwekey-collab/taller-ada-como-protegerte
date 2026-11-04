(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const clues = {
    urgency:['Te mete prisa','Una amenaza de bloqueo busca que actúes sin comprobar el aviso.'],
    link:['Un enlace por comprobar','Un nombre que parece oficial no demuestra quién está detrás. Abre la app o web oficial por tu cuenta.'],
    code:['Quiere tu código','Un código temporal puede permitir entrar en tu cuenta. No se envía a quien lo pide por un mensaje.']
  };
  const discovered = new Set();
  function smsNote(title,message,kind='') {
    $('sms-note-title').textContent=title;
    $('sms-note-text').textContent=message;
    $('sms-note').dataset.kind=kind;
  }
  function resetSms() {
    discovered.clear();
    document.querySelectorAll('[data-sms-clue]').forEach(b=>{b.classList.remove('clue-found');b.setAttribute('aria-pressed','false');});
    $('sms-clue-count').textContent='Pistas descubiertas: 0 de 3';
    $('sms-decisions').hidden=false;
    $('sms-protection').hidden=true;
    smsNote('¿Qué te hace desconfiar?','Toca las partes del mensaje que te hagan sospechar.');
  }
  document.querySelectorAll('[data-sms-clue]').forEach(b=>b.addEventListener('click',()=>{
    const name=b.dataset.smsClue;
    discovered.add(name);b.classList.add('clue-found');b.setAttribute('aria-pressed','true');
    $('sms-clue-count').textContent=`Pistas descubiertas: ${discovered.size} de 3`;
    smsNote(...clues[name]);
  }));
  document.querySelectorAll('[data-sms-answer]').forEach(b=>b.addEventListener('click',()=>{
    if(b.dataset.smsAnswer==='official') {
      smsNote('✓ Comprueba por otra vía','Una web falsa puede robar incluso una contraseña fuerte. Entra desde la app o web oficial.', 'success');
      $('sms-decisions').hidden=true;
      $('sms-protection').hidden=false;
    } else if(b.dataset.smsAnswer==='code') {
      smsNote('Ese código también se protege','Quien lo pide podría estar intentando entrar en tu cuenta. Comprueba el aviso desde la app oficial.', 'warning');
    } else {
      smsNote('El enlace no verifica el aviso','Podría llevarte a una página falsa. Abre la aplicación o la web oficial por tu cuenta.', 'warning');
    }
  }));
  $('sms-retry').addEventListener('click',resetSms);

  const message='Nos vemos en el recreo.';
  let generation=0;
  const sendButtons=[...document.querySelectorAll('[data-send-mode]')];
  function transmissionState(mode,packet,observer,received,feedback) {
    $('transmission-scene').dataset.mode=mode;
    $('transmission-packet').textContent=packet;
    $('transmission-observer').textContent=observer;
    $('transmission-received').textContent=received;
    $('transmission-feedback').textContent=feedback;
    $('recipient-key').hidden=mode!=='encrypted';
    sendButtons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.sendMode===mode)));
    const scene=$('transmission-scene');scene.classList.remove('travelling');
    void scene.offsetWidth;
    if(mode==='plain'||mode==='encrypted')scene.classList.add('travelling');
  }
  function resetTransmission() {
    generation++;
    sendButtons.forEach(b=>b.disabled=false);
    $('transmission-scene').setAttribute('aria-busy','false');
    transmissionState('waiting','¿Qué viajará?','¿Podrá leerlo?','Aún no ha llegado','Elige cómo lo enviamos y observa qué puede leer cada persona.');
  }
  async function send(mode) {
    const run=++generation;
    if(mode==='plain') {
      transmissionState('plain',message,'Puede leer el contenido',message,'Sin cifrar, alguien que intercepte el mensaje puede entenderlo.');
      return;
    }
    sendButtons.forEach(b=>b.disabled=true);
    $('transmission-scene').setAttribute('aria-busy','true');
    try {
      if(!window.crypto?.subtle)throw new Error('No Web Crypto');
      const key=await crypto.subtle.generateKey({name:'AES-GCM',length:256},false,['encrypt','decrypt']);
      const iv=crypto.getRandomValues(new Uint8Array(12));
      const encoded=new TextEncoder().encode(message);
      const encrypted=await crypto.subtle.encrypt({name:'AES-GCM',iv},key,encoded);
      const decrypted=await crypto.subtle.decrypt({name:'AES-GCM',iv},key,encrypted);
      const recovered=new TextDecoder().decode(decrypted);
      if(recovered!==message)throw new Error('Recovery mismatch');
      if(run!==generation)return;
      const packet=btoa(String.fromCharCode(...new Uint8Array(encrypted)));
      transmissionState('encrypted',packet,'Ve datos cifrados',recovered,'El contenido viaja cifrado. El destinatario lo recupera con la clave.');
    } catch {
      if(run!==generation)return;
      transmissionState('unavailable','No se ha enviado','Sin envío','Sin envío','Para esta demostración, abre el enlace del taller en un navegador actualizado.');
    } finally {
      if(run===generation) {
        sendButtons.forEach(b=>b.disabled=false);
        $('transmission-scene').setAttribute('aria-busy','false');
      }
    }
  }
  sendButtons.forEach(b=>b.addEventListener('click',()=>send(b.dataset.sendMode)));
  $('restart').addEventListener('click',()=>{resetSms();resetTransmission();});
  resetSms();resetTransmission();
})();
