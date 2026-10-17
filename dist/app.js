(()=>{'use strict';
const $=(q,root=document)=>root.querySelector(q);const $$=(q,root=document)=>[...root.querySelectorAll(q)];
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const menu=$('#menu'),nav=$('#nav');
function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Abrir menu')}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';nav.classList.toggle('open',open);menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Fechar menu':'Abrir menu')});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){closeMenu();menu.focus()}});
document.addEventListener('click',e=>{if(!e.target.closest('header'))closeMenu()});
$$('nav a').forEach(a=>{if(a.dataset.page===document.body.dataset.page)a.setAttribute('aria-current','page')});
if('IntersectionObserver' in window&&!reduce){document.documentElement.classList.add('js');const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.08});$$('.reveal').forEach((e,i)=>{e.style.transitionDelay=((i%3)*70)+'ms';io.observe(e)})}
// Native dialog keeps focus inside the artwork viewer and supports Escape.
const dialog=$('#art-dialog');let lastArt;
$$('[data-art]').forEach(card=>card.addEventListener('click',()=>{lastArt=card;$('#modal-image').src='assets/'+card.dataset.art+'.svg';$('#modal-image').alt='Flash art conceitual: '+card.dataset.title;$('#modal-title').textContent=card.dataset.title;dialog.showModal();document.body.style.overflow='hidden'}));
$('.close',dialog).addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
dialog.addEventListener('close',()=>{document.body.style.overflow='';lastArt?.focus()});
$$('[data-filter]').forEach(button=>button.addEventListener('click',()=>{$$('[data-filter]').forEach(b=>{const on=b===button;b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on))});let count=0;$$('[data-style]').forEach(card=>{card.hidden=button.dataset.filter!=='all'&&card.dataset.style!==button.dataset.filter;if(!card.hidden){count++;card.classList.add('visible')}});$('#filter-status').textContent=count+' desenhos exibidos.'}));
const motion=$('#motion-toggle');motion.addEventListener('click',()=>{const paused=document.documentElement.classList.toggle('motion-paused');motion.setAttribute('aria-pressed',String(paused));motion.textContent=paused?'Ativar animações':'Pausar animações'});
const form=$('#quote-form');if(!form)return;
// All steps are local; no analytics, storage, or outgoing form requests.
let step=0;const steps=$$('[data-step]',form);const labels=['01 / A DIREÇÃO','02 / OS DETALHES','03 / SUA HISTÓRIA'];
function render(){steps.forEach((s,i)=>{s.hidden=i!==step;$$('input,select,textarea',s).forEach(c=>c.disabled=i!==step)});$('#step-label').textContent=labels[step];$('#step-number').textContent=(step+1)+' DE 3';$('#progress').style.width=((step+1)/3*100)+'%';$('#back').hidden=step===0;$('#next').hidden=step===2;$('#submit').hidden=step!==2;$('#form-error').textContent='';if(step===2)summary()}
function summary(){const box=$('#quote-summary');box.replaceChildren();const dl=document.createElement('dl');['estilo','regiao','tamanho','ideia'].forEach(name=>{let input=name==='estilo'?$('input[name=estilo]:checked',form):$('[name='+name+']',form);const dt=document.createElement('dt');dt.textContent=({estilo:'ESTILO',regiao:'REGIÃO',tamanho:'TAMANHO',ideia:'SUA IDEIA'})[name];const dd=document.createElement('dd');dd.textContent=input?.value||'Não informado';dl.append(dt,dd)});box.append(dl)}
function validate(){const fields=$$('input,select,textarea',steps[step]);const first=fields.find(c=>!c.checkValidity());if(first){$('#form-error').textContent=step===0?'Escolha um estilo para continuar.':'Confira os campos obrigatórios antes de continuar.';first.reportValidity();first.focus();return false}const text=$('[name=ideia]',form);if(step===1&&text.value.trim().length<10){$('#form-error').textContent='Conte sua ideia com pelo menos 10 caracteres.';text.focus();return false}return true}
function moveFocus(){steps[step].setAttribute('tabindex','-1');steps[step].focus({preventScroll:true});if(innerWidth<701)$('#step-label').scrollIntoView({behavior:reduce?'instant':'smooth',block:'start'})}
$('#next').addEventListener('click',()=>{if(validate()){step++;render();moveFocus()}});$('#back').addEventListener('click',()=>{step--;render();moveFocus()});
form.addEventListener('submit',e=>{e.preventDefault();if(step<2){if(validate()){step++;render();moveFocus()}return}if(!validate())return;const name=$('[name=nome]',form).value.trim();if(!name){$('#form-error').textContent='Digite seu primeiro nome.';return}$('#success-title').textContent=name+', sua ideia ganhou forma.';form.hidden=true;$('#success').hidden=false;$('#success').focus();$('#progress').style.width='100%';$('#step-label').textContent='SIMULAÇÃO CONCLUÍDA';$('#step-number').textContent='✓'});
$('#restart').addEventListener('click',()=>{form.reset();form.hidden=false;$('#success').hidden=true;step=0;render();moveFocus()});render();
})();
