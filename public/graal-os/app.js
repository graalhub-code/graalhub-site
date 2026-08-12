(() => {
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const reduceQuery = matchMedia('(prefers-reduced-motion: reduce)');
  const sections = $$('.scene');
  const rail = $('#rail');
  const progress = $('#progress');
  const chapterIndex = $('#chapterIndex');
  const chapterTitle = $('#chapterTitle');
  let reduceMotion = reduceQuery.matches;
  const cursorAura = $('#cursorAura');
  if (cursorAura && matchMedia('(pointer:fine)').matches) {
    let cursorX = innerWidth / 2, cursorY = innerHeight / 2, auraX = cursorX, auraY = cursorY;
    addEventListener('pointermove', event => { cursorX = event.clientX; cursorY = event.clientY; }, { passive:true });
    const driftCursor = () => {
      auraX += (cursorX - auraX) * .16; auraY += (cursorY - auraY) * .16;
      cursorAura.style.transform = `translate(${auraX - 43}px,${auraY - 43}px)`;
      requestAnimationFrame(driftCursor);
    };
    driftCursor();
    $$('a,button,.cog-card,.feature-card,.confidence-card').forEach(el => {
      el.addEventListener('pointerenter', () => cursorAura.classList.add('hot'));
      el.addEventListener('pointerleave', () => cursorAura.classList.remove('hot'));
    });
  }

  sections.forEach((section, index) => {
    const link = document.createElement('a');
    link.href = `#${section.id}`;
    link.title = section.dataset.short;
    link.setAttribute('aria-label', `${String(index + 1).padStart(2, '0')} — ${section.dataset.title}`);
    link.innerHTML = '<i></i>';
    rail.appendChild(link);
  });
  const railLinks = $$('a', rail);

  $$('.section-head h2, .maker-side h2, .judge-side h2, .brain-copy h2, .architecture-copy h2, .north-copy h2').forEach((title, titleIndex) => {
    title.classList.add('motion-title', ['motion-left','motion-right','motion-scale','motion-cut'][titleIndex % 4]);
    [...title.childNodes].forEach(node => {
      if (node.nodeType !== Node.TEXT_NODE || !node.textContent.trim()) return;
      const fragment = document.createDocumentFragment();
      node.textContent.split(/(\s+)/).forEach(part => {
        if (!part.trim()) { fragment.append(part); return; }
        const span = document.createElement('span'); span.className = 'kinetic-word'; span.textContent = part; fragment.append(span);
      });
      node.replaceWith(fragment);
    });
    $$('.kinetic-word', title).forEach((word, index) => word.style.setProperty('--word-index', index));
  });

  const setChapter = (section) => {
    const index = sections.indexOf(section);
    railLinks.forEach((link, i) => link.classList.toggle('active', i === index));
    chapterIndex.textContent = String(index + 1).padStart(2, '0');
    chapterTitle.textContent = section.dataset.title;
    if (!reduceMotion && !section.classList.contains('scene-seen')) {
      section.classList.add('scene-seen','scene-enter');
      setTimeout(() => section.classList.remove('scene-enter'), 800);
    }
  };

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: .12, rootMargin: '0px 0px -8% 0px' });
  $$('.reveal').forEach((el, i) => {
    el.style.transitionDelay = `${Math.min((i % 4) * 70, 210)}ms`;
    revealObserver.observe(el);
  });

  const sectionObserver = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) setChapter(visible.target);
  }, { threshold: [.25, .5, .75] });
  sections.forEach(section => sectionObserver.observe(section));

  const onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.width = `${max > 0 ? (scrollY / max) * 100 : 0}%`;
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const sceneProgress = Math.max(-1, Math.min(1, (innerHeight * .5 - rect.top) / Math.max(rect.height, innerHeight)));
      section.style.setProperty('--scene-progress', sceneProgress.toFixed(3));
    });
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (matchMedia('(pointer:fine)').matches) {
    addEventListener('pointermove', event => {
      document.documentElement.style.setProperty('--mx', `${event.clientX}px`);
      document.documentElement.style.setProperty('--my', `${event.clientY}px`);
    }, { passive: true });
  }

  const motionButton = $('#motionToggle');
  const applyMotion = value => {
    reduceMotion = value;
    document.body.classList.toggle('reduced-motion', value);
    motionButton.setAttribute('aria-pressed', String(value));
    motionButton.querySelector('em').textContent = value ? 'Motion off' : 'Motion';
  };
  applyMotion(reduceMotion);
  motionButton.addEventListener('click', () => applyMotion(!reduceMotion));

  const agents = {
    orchestrator: { type:'CENTRAL INTELLIGENCE', name:'Hub Orchestrator', role:'Converte intenção humana em um job estruturado e governa a jornada inteira.', inputs:'objetivo · audiência · prazo · contexto', outputs:'job graph · routing · nível de risco', gate:'clareza suficiente para começar' },
    strategy: { type:'BUSINESS INTELLIGENCE', name:'Strategy Cell', role:'Encontra o problema real, constrói a tese e define como sucesso será reconhecido.', inputs:'brief · pesquisa · negócio · cultura', outputs:'diagnóstico · proposition · KPI', gate:'evidência e coerência estratégica' },
    creative: { type:'DIVERGENT MAKING', name:'Creative Cell', role:'Transforma direção estratégica em uma plataforma distintiva e executável.', inputs:'tese · marca · tensão humana', outputs:'territórios · conceito · sistema visual', gate:'distinção, relevância e craft' },
    data: { type:'EVIDENCE & MEASUREMENT', name:'Data Cell', role:'Modela dados, testa hipóteses e audita a lógica quantitativa do trabalho.', inputs:'fontes · métricas · regras de negócio', outputs:'modelo · dashboard · confidence', gate:'integridade de cálculo e fonte' },
    digital: { type:'PRODUCT SYSTEMS', name:'Digital Cell', role:'Converte necessidades humanas em requisitos, interfaces e sistemas mensuráveis.', inputs:'jobs-to-be-done · dados · restrições', outputs:'UX · UI · código · analytics', gate:'acessibilidade, segurança e performance' },
    media: { type:'DISTRIBUTION INTELLIGENCE', name:'Media Cell', role:'Decide onde a ideia encontra pessoas e como o investimento gera efeito.', inputs:'público · canais · verba · criativo', outputs:'plano · alocação · mensuração', gate:'eficiência, cobertura e incrementality' },
    experience: { type:'REAL-WORLD OPERATIONS', name:'Experience Cell', role:'Desenha experiências físicas, digitais e híbridas que podem realmente acontecer.', inputs:'conceito · jornada · operação', outputs:'experience map · produção · contingência', gate:'viabilidade, segurança e impacto' },
    red: { type:'ADVERSARIAL QUALITY', name:'GRAAL Red Team', role:'Interrompe o fluxo para encontrar fraquezas antes do cliente, do público ou do mercado.', inputs:'solução candidata · critérios · riscos', outputs:'ataques · falhas · recomendações', gate:'fraquezas críticas resolvidas ou veto' }
  };
  const agentFields = { type:$('#agentType'), name:$('#agentName'), role:$('#agentRole'), inputs:$('#agentInputs'), outputs:$('#agentOutputs'), gate:$('#agentGate') };
  let selectedAgent = 'orchestrator';
  const summoned = new Set();
  let nucleusTimer = null;
  const constellation = $('#constellation');
  const nucleusStatus = $('#nucleusStatus');
  const core = $('.agent-core');
  const coreState = $('#coreState');
  const summonedCells = $('#summonedCells');
  const nodeFor = key => $(`[data-agent="${key}"]`, constellation);
  const renderSummoned = () => {
    summonedCells.innerHTML = [...summoned].map(key => `<span>${agents[key].name}</span>`).join('');
    $$('.agent-node').forEach(node => node.classList.toggle('summoned', summoned.has(node.dataset.agent)));
  };
  const routePacket = (targetKey, reverse = false) => {
    const target = nodeFor(targetKey);
    if (!target || target === core) return Promise.resolve();
    const layer = $('#routeLayer');
    const layerBox = layer.getBoundingClientRect();
    const fromBox = (reverse ? target : core).getBoundingClientRect();
    const toBox = (reverse ? core : target).getBoundingClientRect();
    const packet = document.createElement('i');
    packet.className = `route-packet${targetKey === 'red' ? ' red-packet' : ''}`;
    const from = { x: fromBox.left + fromBox.width / 2 - layerBox.left - 5, y: fromBox.top + fromBox.height / 2 - layerBox.top - 5 };
    const to = { x: toBox.left + toBox.width / 2 - layerBox.left - 5, y: toBox.top + toBox.height / 2 - layerBox.top - 5 };
    packet.style.transform = `translate(${from.x}px,${from.y}px)`;
    layer.appendChild(packet);
    if (reduceMotion || !packet.animate) {
      packet.style.transform = `translate(${to.x}px,${to.y}px)`;
      setTimeout(() => packet.remove(), 180);
      return Promise.resolve();
    }
    const animation = packet.animate([
      {transform:`translate(${from.x}px,${from.y}px) scale(.7)`,opacity:.4},
      {transform:`translate(${to.x}px,${to.y}px) scale(1.25)`,opacity:1}
    ], {duration:620,easing:'cubic-bezier(.16,1,.3,1)',fill:'forwards'});
    return animation.finished.then(() => packet.remove()).catch(() => packet.remove());
  };
  const selectAgent = button => {
    const data = agents[button.dataset.agent];
    selectedAgent = button.dataset.agent;
    $$('.agent-node, .agent-core').forEach(node => node.classList.remove('active'));
    button.classList.add('active');
    Object.entries(agentFields).forEach(([key, node]) => {
      node.animate && !reduceMotion && node.animate([{opacity:.2,transform:'translateY(6px)'},{opacity:1,transform:'none'}],{duration:320,easing:'ease-out'});
      node.textContent = data[key];
    });
    nucleusStatus.textContent = button === core ? 'Núcleo online · escolha uma célula ou orquestre o sistema' : `${data.name} em foco · pronta para convocação`;
    if (button !== core) routePacket(button.dataset.agent);
  };
  $$('.agent-node, .agent-core').forEach(button => button.addEventListener('click', () => selectAgent(button)));

  $('#summonAgent').addEventListener('click', async () => {
    if (selectedAgent === 'orchestrator') {
      nucleusStatus.textContent = 'Escolha primeiro uma célula especialista no mapa.';
      core.classList.add('processing');
      setTimeout(() => core.classList.remove('processing'), 900);
      return;
    }
    const target = nodeFor(selectedAgent);
    core.classList.add('processing'); target.classList.add('processing');
    coreState.textContent = 'roteando contexto'; nucleusStatus.textContent = `Enviando contexto para ${agents[selectedAgent].name}…`;
    await routePacket(selectedAgent);
    summoned.add(selectedAgent); renderSummoned();
    target.classList.remove('processing'); core.classList.remove('processing');
    coreState.textContent = 'célula ativa'; nucleusStatus.textContent = `${agents[selectedAgent].name} convocada · contexto compartilhado`;
  });

  $('#scanSystem').addEventListener('click', () => {
    clearTimeout(nucleusTimer);
    const sequence = ['strategy','data','creative','media','digital','experience','red'];
    const phases = ['Investigando o problema real','Validando evidências','Abrindo territórios criativos','Planejando distribuição','Traduzindo em sistema','Testando viabilidade','GRAAL Red ataca a solução'];
    let index = 0;
    summoned.clear(); renderSummoned(); core.classList.add('processing'); coreState.textContent = 'diagnosticando';
    const next = async () => {
      const key = sequence[index]; const node = nodeFor(key);
      node.classList.add('processing'); nucleusStatus.textContent = phases[index];
      await routePacket(key);
      summoned.add(key); renderSummoned(); node.classList.remove('processing');
      index += 1;
      if (index < sequence.length) {
        coreState.textContent = index < 2 ? 'diagnosticando' : index < 6 ? 'orquestrando' : 'quality gate';
        nucleusTimer = setTimeout(next, reduceMotion ? 80 : 300);
      } else {
        await routePacket('red', true); core.classList.remove('processing'); coreState.textContent = 'job governado';
        nucleusStatus.textContent = 'Orquestração completa · 7 células conectadas · quality gate ativo';
      }
    };
    next();
  });

  const jobs = {
    campaign: { code:'C-014', title:'Lançar uma campanha que aumente consideração', risk:'R3', mode:'Professional', goal:'Brand lift', agents:['Strategy','Research','Creative','Copy','Media','Brand Judge'] },
    dashboard: { code:'D-027', title:'Criar um produto para decisões diárias de mídia', risk:'R4', mode:'Critical', goal:'Decision speed', agents:['Requirements','Data','UX','UI','Frontend','Analytics','Tech QA'] },
    deck: { code:'E-041', title:'Conquistar aprovação do conselho para o plano 2027', risk:'R4', mode:'Critical', goal:'Decision', agents:['Research','Strategy','Finance','Data','Presentation','Executive Judge'] }
  };
  let activeJob = 'campaign';
  let simulationTimer = null;
  const flowNodes = $$('.flow-node');
  const flowLinks = $$('.flow-link');
  const calledAgents = $('#calledAgents');
  const status = $('#simulationStatus');
  const renderJob = key => {
    activeJob = key;
    const job = jobs[key];
    $('#jobCode').textContent = job.code; $('#jobTitle').textContent = job.title; $('#jobRisk').textContent = job.risk; $('#jobMode').textContent = job.mode; $('#jobGoal').textContent = job.goal;
    calledAgents.innerHTML = job.agents.map((agent, index) => `<span style="animation-delay:${index * 45}ms">${agent}</span>`).join('');
    flowNodes.forEach((node, i) => { node.classList.toggle('active', i === 0); node.classList.remove('done'); });
    flowLinks.forEach(link => link.classList.remove('done'));
    status.textContent = 'Pronto para percorrer o sistema.';
  };
  $$('.sim-controls button').forEach(button => button.addEventListener('click', () => {
    clearTimeout(simulationTimer);
    $$('.sim-controls button').forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    renderJob(button.dataset.job);
  }));
  renderJob(activeJob);

  const stepMessages = ['Intenção recebida e estruturada.','Problema real e lacunas identificados.','Célula especialista convocada.','Makers produzindo a solução.','Red Team interrompe: evidência, distinção e risco sob ataque.','Gates vencidos. Entrega liberada com rastreabilidade.'];
  $('#runJob').addEventListener('click', () => {
    clearTimeout(simulationTimer);
    flowNodes.forEach(node => node.classList.remove('active','done'));
    flowLinks.forEach(link => link.classList.remove('done'));
    let step = 0;
    const advance = () => {
      flowNodes.forEach((node, index) => { node.classList.toggle('active', index === step); node.classList.toggle('done', index < step); });
      flowLinks.forEach((link, index) => link.classList.toggle('done', index < step));
      status.textContent = stepMessages[step];
      if (step < flowNodes.length - 1) { step += 1; simulationTimer = setTimeout(advance, reduceMotion ? 180 : step === 4 ? 1200 : 720); }
    };
    advance();
  });

  $$('.cog-card').forEach((card, index) => {
    card.tabIndex = 0;
    const activate = () => {
      $$('.cog-card').forEach(item => item.classList.remove('active'));
      card.classList.add('active');
    };
    card.addEventListener('click', activate);
    card.addEventListener('focus', activate);
    if (!reduceMotion) setInterval(() => card.classList.toggle('auto-pulse'), 4200 + index * 170);
  });

  $$('.risk-meter > div:not(.risk-line)').forEach((level, index) => {
    level.tabIndex = 0; level.setAttribute('role','button'); level.setAttribute('aria-label',`Selecionar risco ${level.innerText}`);
    const selectRisk = () => {
      $$('.risk-meter > div:not(.risk-line)').forEach(item => item.classList.remove('active'));
      level.classList.add('active');
      const note = $('.trust-note');
      const reviews = ['resposta direta','micro QA','verificação independente','Red Team seletivo','gates executivos','veto obrigatório'];
      note.textContent = `${level.querySelector('b').textContent}: ${reviews[index]} — profundidade e governança ajustadas automaticamente.`;
    };
    level.addEventListener('click', selectRisk); level.addEventListener('keydown', e => { if(e.key==='Enter'||e.key===' ') selectRisk(); });
  });

  const adversarial = $('.adversarial');
  const redTrigger = $('.veto-stamp');
  if (redTrigger) {
    redTrigger.tabIndex = 0; redTrigger.setAttribute('role','button'); redTrigger.setAttribute('aria-label','Ativar ataque do Red Team');
    const attack = () => { adversarial.classList.remove('attacking'); requestAnimationFrame(() => adversarial.classList.add('attacking')); setTimeout(() => adversarial.classList.remove('attacking'), 1800); };
    redTrigger.addEventListener('click', attack); redTrigger.addEventListener('keydown', e => { if(e.key==='Enter'||e.key===' ') attack(); });
  }

  $$('.evolution-track article').forEach(stage => {
    stage.tabIndex = 0;
    const selectStage = () => { $$('.evolution-track article').forEach(item => item.classList.remove('current')); stage.classList.add('current'); };
    stage.addEventListener('click', selectStage); stage.addEventListener('focus', selectStage);
  });

  $$('.memory-stack > button').forEach(layer => layer.addEventListener('click', () => {
    $$('.memory-stack > button').forEach(item => item.classList.remove('active'));
    layer.classList.add('active');
    layer.animate && !reduceMotion && layer.animate([{filter:'brightness(1)'},{filter:'brightness(1.8)'},{filter:'brightness(1)'}],{duration:650,easing:'ease-out'});
  }));

  const architectureStage = $('#architectureStage');
  const architectureCanvas = $('#architectureCanvas');
  const architecturePlay = $('#architecturePlay');
  if (architectureCanvas && architectureStage && architecturePlay) {
    const ctx = architectureCanvas.getContext('2d');
    const architectureStep = $('#architectureStep');
    const architectureNarrative = $('#architectureNarrative');
    const architectureTime = $('#architectureTime');
    const phases = [
      ['INTELLIGENCE','Contexto, sinais e intenção são percebidos.'],['DECISION','O pedido é convertido no problema real.'],['PLANNING','O Orchestrator escolhe risco, profundidade e rota.'],['SPECIALISTS','A célula certa é convocada para produzir.'],['CRITIQUE','GRAAL Red interrompe e ataca a solução.'],['VALIDATION','Evidência, marca, dados e técnica atravessam gates.'],['EXECUTION','A entrega validada chega ao mundo.'],['MEASUREMENT','Resultados reais substituem opiniões.'],['LEARNING','Memória e evals melhoram o próximo job.']
    ];
    let architectureRaf = 0, architectureStart = 0, architectureRunning = false;
    const fitArchitecture = () => {
      const box = architectureStage.getBoundingClientRect(); const ratio = Math.min(devicePixelRatio || 1, 2);
      architectureCanvas.width = Math.round(box.width * ratio); architectureCanvas.height = Math.round(box.height * ratio); ctx.setTransform(ratio,0,0,ratio,0,0); drawArchitecture(0);
    };
    const drawArchitecture = progressValue => {
      const w=architectureCanvas.clientWidth,h=architectureCanvas.clientHeight,cx=w/2,cy=h/2; ctx.clearRect(0,0,w,h);
      const mobile=w<600, radius=Math.min(w*(mobile?.37:.39),h*(mobile?.33:.38));
      ctx.save(); ctx.translate(cx,cy); ctx.rotate(-Math.PI/2);
      ctx.strokeStyle='rgba(247,234,217,.10)';ctx.lineWidth=1;ctx.setLineDash([3,8]);ctx.beginPath();ctx.arc(0,0,radius,0,Math.PI*2);ctx.stroke();ctx.setLineDash([]);
      const activeFloat=progressValue*phases.length,active=Math.min(phases.length-1,Math.floor(activeFloat)),local=activeFloat-active;
      for(let i=0;i<phases.length;i++){
        const a=i/phases.length*Math.PI*2; const x=Math.cos(a)*radius,y=Math.sin(a)*radius; const isActive=i===active,isDone=i<active;
        ctx.save();ctx.translate(x,y);ctx.rotate(Math.PI/2);
        ctx.fillStyle=isActive?'#e04030':isDone?'#ff7466':'rgba(247,234,217,.14)';ctx.beginPath();ctx.arc(0,0,isActive?9:5,0,Math.PI*2);ctx.fill();
        if(isActive){ctx.strokeStyle='rgba(224,64,48,.35)';ctx.lineWidth=1;ctx.beginPath();ctx.arc(0,0,18+Math.sin(local*Math.PI)*9,0,Math.PI*2);ctx.stroke()}
        ctx.fillStyle=isActive?'#f7ead9':'rgba(247,234,217,.52)';ctx.font=`600 ${mobile?7:9}px Syne`;ctx.textAlign='center';ctx.fillText(phases[i][0],0,i<5?-18:25);ctx.restore();
      }
      if(progressValue>0){const path=Math.min(activeFloat,phases.length-.001)/phases.length*Math.PI*2;const px=Math.cos(path)*radius,py=Math.sin(path)*radius;ctx.fillStyle='#f7ead9';ctx.shadowColor='#e04030';ctx.shadowBlur=24;ctx.beginPath();ctx.arc(px,py,7,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0}
      ctx.restore();
      const coreR=mobile?66:88;const glow=ctx.createRadialGradient(cx,cy,0,cx,cy,coreR*1.6);glow.addColorStop(0,'rgba(224,64,48,.42)');glow.addColorStop(1,'rgba(224,64,48,0)');ctx.fillStyle=glow;ctx.beginPath();ctx.arc(cx,cy,coreR*1.6,0,Math.PI*2);ctx.fill();ctx.strokeStyle='rgba(255,116,102,.6)';ctx.lineWidth=1;ctx.beginPath();ctx.arc(cx,cy,coreR,0,Math.PI*2);ctx.stroke();ctx.fillStyle='#f7ead9';ctx.textAlign='center';ctx.font=`700 ${mobile?11:14}px Syne`;ctx.fillText('ORCHESTRATOR',cx,cy-2);ctx.fillStyle='#ff7466';ctx.font=`600 ${mobile?7:9}px Syne`;ctx.fillText('COGNITIVE CORE',cx,cy+17);
      if(progressValue>.42&&progressValue<.66){ctx.strokeStyle=`rgba(224,64,48,${.3+Math.sin(progressValue*50)*.25})`;ctx.lineWidth=mobile?8:14;ctx.beginPath();ctx.moveTo(cx-radius*.92,cy);ctx.lineTo(cx+radius*.92,cy);ctx.stroke();ctx.fillStyle='#e04030';ctx.font=`800 ${mobile?32:54}px Syne`;ctx.fillText('INTERRUPT',cx,cy-radius*.48)}
    };
    const tickArchitecture = time => {
      if(!architectureStart)architectureStart=time;const elapsed=time-architectureStart,duration=20500,p=Math.min(elapsed/duration,1);drawArchitecture(p);
      const phaseIndex=Math.min(phases.length-1,Math.floor(p*phases.length));architectureStep.textContent=phases[phaseIndex][0];architectureNarrative.textContent=phases[phaseIndex][1];architectureTime.textContent=`00:${String(Math.floor(elapsed/1000)).padStart(2,'0')}`;
      if(p<1&&architectureRunning)architectureRaf=requestAnimationFrame(tickArchitecture);else{architectureRunning=false;architectureStage.classList.remove('playing');architectureStage.classList.add('complete');architecturePlay.querySelector('span').innerHTML='PLAY<br>AGAIN';architecturePlay.setAttribute('aria-label','Reproduzir novamente a animação completa do GRAAL OS')}
    };
    architecturePlay.addEventListener('click',()=>{
      cancelAnimationFrame(architectureRaf);architectureStart=0;architectureStage.classList.remove('complete');
      if(reduceMotion){drawArchitecture(1);architectureStep.textContent=phases.at(-1)[0];architectureNarrative.textContent=phases.at(-1)[1];architectureTime.textContent='00:20';architectureStage.classList.add('complete');architecturePlay.querySelector('span').innerHTML='PLAY<br>AGAIN';architecturePlay.setAttribute('aria-label','Reproduzir novamente a animação completa do GRAAL OS');return}
      architectureRunning=true;architectureStage.classList.add('playing');architecturePlay.setAttribute('aria-label','Animação do GRAAL OS em reprodução');architectureRaf=requestAnimationFrame(tickArchitecture)
    });
    addEventListener('resize',fitArchitecture);fitArchitecture();
  }

  document.addEventListener('keydown', event => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    if (/button|a|input/i.test(document.activeElement.tagName)) return;
    const current = sections.findIndex(section => section.getBoundingClientRect().top > -innerHeight * .4 && section.getBoundingClientRect().top < innerHeight * .6);
    const target = Math.max(0, Math.min(sections.length - 1, current + (event.key === 'ArrowDown' ? 1 : -1)));
    sections[target].scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  });
})();
