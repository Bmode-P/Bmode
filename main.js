const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

    function openMenu(){
      hamburger.setAttribute('aria-expanded','true');
      sidebar.classList.add('open');
      overlay.classList.add('open');
    }
    function closeMenu(){
      hamburger.setAttribute('aria-expanded','false');
      sidebar.classList.remove('open');
      overlay.classList.remove('open');
    }

    hamburger.addEventListener('click', ()=>{
      const expanded = hamburger.getAttribute('aria-expanded') === 'true';
      if(expanded) closeMenu(); else openMenu();
    });
    overlay.addEventListener('click', closeMenu);
    document.addEventListener('keydown', (e)=>{if(e.key === 'Escape') closeMenu();});
    
    /*الالعاب*/
    
    const gamesPerPage = 4;
const totalPages = 100;
let currentPage = 1;

const gamesGrid = document.getElementById('gamesGrid');
const pagination = document.getElementById('pagination');

function getGamesForPage(page){
  const games = [];
  const startIndex = (page-1)*gamesPerPage + 1;
  for(let i=0; i<gamesPerPage; i++){
    const gameNumber = startIndex + i;
    if(gameNumber > totalPages*gamesPerPage) break; // لا حاجة لكن أتركه للسلامة
    games.push({
      name: `لعبة ${gameNumber}`,
      img: `https://via.placeholder.com/300x180/${(Math.floor(Math.random()*16777215)).toString(16)}/ffffff?text=لعبة+${gameNumber}`
    });
  }
  return games;
}

function renderGames(){
  gamesGrid.innerHTML = '';
  const currentGames = getGamesForPage(currentPage);
  currentGames.forEach(game=>{
    const card = document.createElement('div');
    card.className = 'game-card';
    card.innerHTML = `<img src="${game.img}" alt="${game.name}"><div class="game-info">${game.name}</div>`;
    gamesGrid.appendChild(card);
  });
}

function renderPagination(){
  pagination.innerHTML = '';

  // زر السابق
  if(currentPage > 1){
    const prevBtn = document.createElement('button');
    prevBtn.textContent = '⬅ السابق';
    prevBtn.addEventListener('click', ()=>{
      currentPage--;
      renderGames();
      renderPagination();
    });
    pagination.appendChild(prevBtn);
  }

  // أرقام الصفحات
  for(let i=1;i<=totalPages;i++){
    if(i===1 || i===totalPages || Math.abs(i-currentPage)<=2){
      const btn = document.createElement('button');
      btn.textContent = i;
      if(i===currentPage) btn.classList.add('active');
      btn.addEventListener('click', ()=>{
        currentPage=i; 
        renderGames(); 
        renderPagination();
      });
      pagination.appendChild(btn);
    } else if(
      (i===2 && currentPage>4) ||
      (i===totalPages-1 && currentPage<totalPages-3)
    ){
      const dots = document.createElement('span');
      dots.textContent = '...';
      pagination.appendChild(dots);
    }
  }

  // زر التالي
  if(currentPage < totalPages){
    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'التالي ➡';
    nextBtn.addEventListener('click', ()=>{
      currentPage++;
      renderGames();
      renderPagination();
    });
    pagination.appendChild(nextBtn);
  }
}

const allGames = [
  {
    name: "Hay day",
    img: "/unnamed (2).jpg",
    desc: "لعبة عالم مفتوح مليئة بالمغامرات والحرية.",
    price: "30$"
  },
  {
    name: "FIFA 23",
    img: "https://i.postimg.cc/cLqRqNc2/V-2-1-180x180.webp",
    desc: "Hay Day game mod unlimited money",
    link:"index.html"
  },
  {
    name: "Minecraft",
    img: "images/minecraft.jpg",
    desc: "لعبة بناء واستكشاف بقدرات غير محدودة.",
  },
  {
    name: "Call of Duty",
    img: "images/cod.jpg",
    desc: "أكشن وتصويب سريع مع طور جماعي ممتع.",
  },
  {
    name: "Call of Duty",
    img: "images/cod.jpg",
    desc: "أكشن وتصويب سريع مع طور جماعي ممتع.",
  }
];

function getGamesForPage(page){
  const start = (page-1) * gamesPerPage;
  return allGames.slice(start, start + gamesPerPage);
}

function renderGames(){
  gamesGrid.innerHTML = '';
  const currentGames = getGamesForPage(currentPage);
  currentGames.forEach(game=>{
    const card = document.createElement('div');
    card.className = 'game-card';
    card.innerHTML = `
      <img src="${game.img}" alt="${game.name}">
      
      <div class="game-info">
        <h3>${game.name}</h3>
        <p>${game.desc}</p>
      
        <a href="${game.link}" target="_blank" class="Download-btn">Downlod</a>
      </div>
    `;
    gamesGrid.appendChild(card);
  });
}


// أول عرض
renderGames();
renderPagination();

// البحث عن الألعاب
const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', () => {
  const term = searchInput.value.toLowerCase();
  const filtered = allGames.filter(game =>
    game.name.toLowerCase().includes(term) ||
    (game.desc && game.desc.toLowerCase().includes(term))
  );
  
  gamesGrid.innerHTML = '';
  filtered.forEach(game => {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.innerHTML = `
      <img src="${game.img}" alt="${game.name}">
      <div class="game-info">
        <h3>${game.name}</h3>
        <p>${game.desc || ''}</p>
        ${game.link ? `<a href="${game.link}" target="_blank" class="Download-btn">Download</a>` : ''}
      </div>
    `;
    gamesGrid.appendChild(card);
  });
  
  // إذا البحث فاضي، يرجع للوضع العادي
  if (term === '') {
    renderGames();
    renderPagination();
  }
});