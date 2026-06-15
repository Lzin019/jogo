import React, { useState, useEffect, useRef } from 'react';

// === CONFIGURAÇÃO DE SAVE LOCAL ===
// Salvamos no LocalStorage para evitar erros de permissão do Firebase sem login.
const LOCAL_STORAGE_KEY = 'poke_tcg_offline_save';

// === BASE DE DADOS DOS POKÉMONS (MAIS POKÉMONS ADICIONADOS) ===
const POKEMON_DB = [
    {
        id: 1,
        name: 'Bulbasaur',
        type: 'Grass',
        hp: 60,
        attack: 'Chicote de Vinha',
        dmg: 20,
        energyCost: 1,
        weakness: 'Fire',
        hasMega: false,
    },
    {
        id: 2,
        name: 'Ivysaur',
        type: 'Grass',
        hp: 90,
        attack: 'Folha Navalha',
        dmg: 40,
        energyCost: 2,
        weakness: 'Fire',
        hasMega: false,
    },
    {
        id: 3,
        name: 'Venusaur',
        type: 'Grass',
        hp: 160,
        attack: 'Raio Solar',
        dmg: 120,
        energyCost: 3,
        weakness: 'Fire',
        hasMega: true,
    },
    {
        id: 4,
        name: 'Charmander',
        type: 'Fire',
        hp: 60,
        attack: 'Brasa',
        dmg: 20,
        energyCost: 1,
        weakness: 'Water',
        hasMega: false,
    },
    {
        id: 5,
        name: 'Charmeleon',
        type: 'Fire',
        hp: 90,
        attack: 'Lança-Chamas',
        dmg: 50,
        energyCost: 2,
        weakness: 'Water',
        hasMega: false,
    },
    {
        id: 6,
        name: 'Charizard',
        type: 'Fire',
        hp: 160,
        attack: 'Explosão de Fogo',
        dmg: 130,
        energyCost: 3,
        weakness: 'Water',
        hasMega: true,
    },
    {
        id: 7,
        name: 'Squirtle',
        type: 'Water',
        hp: 60,
        attack: 'Bolhas',
        dmg: 20,
        energyCost: 1,
        weakness: 'Grass',
        hasMega: false,
    },
    {
        id: 8,
        name: 'Wartortle',
        type: 'Water',
        hp: 90,
        attack: 'Revólver de Água',
        dmg: 40,
        energyCost: 2,
        weakness: 'Grass',
        hasMega: false,
    },
    {
        id: 9,
        name: 'Blastoise',
        type: 'Water',
        hp: 160,
        attack: 'Hidro Canhão',
        dmg: 120,
        energyCost: 3,
        weakness: 'Grass',
        hasMega: true,
    },
    {
        id: 25,
        name: 'Pikachu',
        type: 'Electric',
        hp: 60,
        attack: 'Choque do Trovão',
        dmg: 30,
        energyCost: 1,
        weakness: 'Fighting',
        hasMega: false,
        vmax: true,
    },
    {
        id: 65,
        name: 'Alakazam',
        type: 'Psychic',
        hp: 130,
        attack: 'Tempestade Psíquica',
        dmg: 90,
        energyCost: 2,
        weakness: 'Ghost',
        hasMega: true,
    },
    {
        id: 94,
        name: 'Gengar',
        type: 'Ghost',
        hp: 130,
        attack: 'Medo Sombrio',
        dmg: 80,
        energyCost: 2,
        weakness: 'Psychic',
        hasMega: true,
    },
    {
        id: 143,
        name: 'Snorlax',
        type: 'Normal',
        hp: 150,
        attack: 'Rolamento Pesado',
        dmg: 90,
        energyCost: 3,
        weakness: 'Fighting',
        hasMega: false,
        vmax: true,
    },
    {
        id: 149,
        name: 'Dragonite',
        type: 'Dragon',
        hp: 170,
        attack: 'Hiper Sopro',
        dmg: 150,
        energyCost: 3,
        weakness: 'None',
        hasMega: false,
    },
    {
        id: 150,
        name: 'Mewtwo',
        type: 'Psychic',
        hp: 140,
        attack: 'Quebra Psíquica',
        dmg: 120,
        energyCost: 3,
        weakness: 'Ghost',
        hasMega: true,
    },
    {
        id: 384,
        name: 'Rayquaza',
        type: 'Dragon',
        hp: 170,
        attack: 'Giga Explosão',
        dmg: 160,
        energyCost: 4,
        weakness: 'None',
        hasMega: true,
    },
    {
        id: 448,
        name: 'Lucario',
        type: 'Fighting',
        hp: 120,
        attack: 'Esfera de Aura',
        dmg: 100,
        energyCost: 2,
        weakness: 'Psychic',
        hasMega: true,
    },
    {
        id: 656,
        name: 'Froakie',
        type: 'Water',
        hp: 60,
        attack: 'Bolas de Espuma',
        dmg: 20,
        energyCost: 1,
        weakness: 'Electric',
        hasMega: false,
    },
    {
        id: 657,
        name: 'Frogadier',
        type: 'Water',
        hp: 90,
        attack: "Pulso D'Água",
        dmg: 40,
        energyCost: 2,
        weakness: 'Electric',
        hasMega: false,
    },
    {
        id: 658,
        name: 'Greninja',
        type: 'Water',
        hp: 150,
        attack: 'Shuriken de Água',
        dmg: 110,
        energyCost: 3,
        weakness: 'Electric',
        hasMega: true,
    },
    {
        id: 447,
        name: 'Riolu',
        type: 'Fighting',
        hp: 70,
        attack: 'Onda de Vácuo',
        dmg: 30,
        energyCost: 1,
        weakness: 'Psychic',
        hasMega: false,
    },
    {
        id: 92,
        name: 'Gastly',
        type: 'Ghost',
        hp: 50,
        attack: 'Lambida',
        dmg: 20,
        energyCost: 1,
        weakness: 'Psychic',
        hasMega: false,
    },
    {
        id: 93,
        name: 'Haunter',
        type: 'Ghost',
        hp: 80,
        attack: 'Sombra Noturna',
        dmg: 40,
        energyCost: 2,
        weakness: 'Psychic',
        hasMega: false,
    },
    // NOVOS
    {
        id: 133,
        name: 'Eevee',
        type: 'Normal',
        hp: 60,
        attack: 'Investida',
        dmg: 20,
        energyCost: 1,
        weakness: 'Fighting',
        hasMega: false,
    },
    {
        id: 134,
        name: 'Vaporeon',
        type: 'Water',
        hp: 110,
        attack: "Jato d'Água",
        dmg: 70,
        energyCost: 2,
        weakness: 'Electric',
        hasMega: false,
    },
    {
        id: 135,
        name: 'Jolteon',
        type: 'Electric',
        hp: 110,
        attack: 'Raio',
        dmg: 70,
        energyCost: 2,
        weakness: 'Fighting',
        hasMega: false,
    },
    {
        id: 136,
        name: 'Flareon',
        type: 'Fire',
        hp: 110,
        attack: 'Lança-Chamas',
        dmg: 70,
        energyCost: 2,
        weakness: 'Water',
        hasMega: false,
    },
    {
        id: 151,
        name: 'Mew',
        type: 'Psychic',
        hp: 90,
        attack: 'Metrônomo',
        dmg: 50,
        energyCost: 1,
        weakness: 'Ghost',
        hasMega: false,
    },
    {
        id: 246,
        name: 'Larvitar',
        type: 'Fighting',
        hp: 60,
        attack: 'Mordida',
        dmg: 20,
        energyCost: 1,
        weakness: 'Water',
        hasMega: false,
    },
    {
        id: 247,
        name: 'Pupitar',
        type: 'Fighting',
        hp: 90,
        attack: 'Temp. de Areia',
        dmg: 40,
        energyCost: 2,
        weakness: 'Water',
        hasMega: false,
    },
    {
        id: 248,
        name: 'Tyranitar',
        type: 'Fighting',
        hp: 160,
        attack: 'Desmoronamento',
        dmg: 130,
        energyCost: 3,
        weakness: 'Water',
        hasMega: true,
    },
    {
        id: 249,
        name: 'Lugia',
        type: 'Psychic',
        hp: 150,
        attack: 'Aeroexplosão',
        dmg: 120,
        energyCost: 3,
        weakness: 'Electric',
        hasMega: false,
    },
    {
        id: 250,
        name: 'Ho-Oh',
        type: 'Fire',
        hp: 150,
        attack: 'Fogo Sagrado',
        dmg: 120,
        energyCost: 3,
        weakness: 'Water',
        hasMega: false,
    },
];

// === BOOSTERS (MAIS BOOSTERS ADICIONADOS) ===
const BOOSTERS = [
    {
        id: 'base',
        name: 'Base Set Clássico',
        desc: 'A coleção original lendária.',
        cost: 100,
        color: 'from-blue-600 to-indigo-800',
        cover: 25,
        rates: { ex: '5%', mega: '1%', holo: '15%', uncommon: '30%' },
    },
    {
        id: 'eevee_heroes',
        name: 'Evoluções Elementais',
        desc: 'Foco nas evoluções do Eevee.',
        cost: 150,
        color: 'from-pink-500 to-rose-700',
        cover: 133,
        rates: { ex: '8%', mega: '2%', holo: '18%', uncommon: '30%' },
    },
    {
        id: 'fire',
        name: 'Chamas Ardentes',
        desc: 'Especializado em Fogo e Dragões.',
        cost: 180,
        color: 'from-red-600 to-amber-700',
        cover: 6,
        rates: { ex: '10%', mega: '3%', holo: '20%', uncommon: '30%' },
    },
    {
        id: 'tempest',
        name: 'Tempestade Climática',
        desc: 'Foco em Água e Elétrico.',
        cost: 200,
        color: 'from-sky-400 to-blue-900',
        cover: 9,
        rates: { ex: '12%', mega: '4%', holo: '22%', uncommon: '28%' },
    },
    {
        id: 'shadow_ninja',
        name: 'Lâminas Sombrias',
        desc: 'Água, Lutador e Trevas.',
        cost: 220,
        color: 'from-purple-800 to-slate-900',
        cover: 658,
        rates: { ex: '14%', mega: '5%', holo: '25%', uncommon: '25%' },
    },
    {
        id: 'colossal',
        name: 'Fúria Colossal',
        desc: 'Monstros gigantes e lutadores.',
        cost: 250,
        color: 'from-stone-600 to-stone-900',
        cover: 248,
        rates: { ex: '16%', mega: '6%', holo: '28%', uncommon: '25%' },
    },
    {
        id: 'legendary',
        name: 'Lendas Antigas',
        desc: 'Apenas poderosos e raros.',
        cost: 350,
        color: 'from-yellow-600 to-amber-900',
        cover: 150,
        rates: { ex: '22%', mega: '7%', holo: '30%', uncommon: '25%' },
    },
    {
        id: 'shining',
        name: 'Destinos Brilhantes',
        desc: 'O pacote supremo. Altas chances.',
        cost: 500,
        color: 'from-emerald-500 via-teal-700 to-slate-900',
        cover: 384,
        rates: { ex: '35%', mega: '15%', holo: '40%', uncommon: '10%' },
    },
];

const PACK_RATES_NUMERIC = {
    base: { ex: 0.05, mega: 0.01, holo: 0.15, uncommon: 0.3 },
    eevee_heroes: { ex: 0.08, mega: 0.02, holo: 0.18, uncommon: 0.3 },
    fire: { ex: 0.1, mega: 0.03, holo: 0.2, uncommon: 0.3 },
    tempest: { ex: 0.12, mega: 0.04, holo: 0.22, uncommon: 0.28 },
    shadow_ninja: { ex: 0.14, mega: 0.05, holo: 0.25, uncommon: 0.25 },
    colossal: { ex: 0.16, mega: 0.06, holo: 0.28, uncommon: 0.25 },
    legendary: { ex: 0.22, mega: 0.07, holo: 0.3, uncommon: 0.25 },
    shining: { ex: 0.35, mega: 0.15, holo: 0.4, uncommon: 0.1 },
};

// === SINTETIZADOR DE ÁUDIO WEB RETRO ===
const playSound = (type) => {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        if (type === 'click') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(600, ctx.currentTime);
            gain.gain.setValueAtTime(0.08, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
            osc.start();
            osc.stop(ctx.currentTime + 0.08);
        } else if (type === 'damage') {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(160, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.25);
            gain.gain.setValueAtTime(0.2, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
            osc.start();
            osc.stop(ctx.currentTime + 0.25);
        } else if (type === 'pack_rip') {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(80, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.4);
            gain.gain.setValueAtTime(0.15, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
            osc.start();
            osc.stop(ctx.currentTime + 0.4);
        } else if (type === 'mine') {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(150, ctx.currentTime);
            osc.frequency.setValueAtTime(450, ctx.currentTime + 0.05);
            gain.gain.setValueAtTime(0.12, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
            osc.start();
            osc.stop(ctx.currentTime + 0.15);
        }
    } catch (e) {}
};

// === GERAÇÃO ALEATÓRIA DE CARTAS ===
function createCard(packType) {
    const rates = PACK_RATES_NUMERIC[packType] || PACK_RATES_NUMERIC.base;
    const r = Math.random();
    let rarity = 'Comum';

    if (r < rates.mega) rarity = 'Mega EX';
    else if (r < rates.mega + rates.ex) rarity = 'EX';
    else if (r < rates.mega + rates.ex + rates.holo) rarity = 'Holográfica';
    else if (r < rates.mega + rates.ex + rates.holo + rates.uncommon) rarity = 'Incomum';

    let pool = POKEMON_DB;
    if (packType === 'fire')
        pool = POKEMON_DB.filter((p) => ['Fire', 'Dragon', 'Normal'].includes(p.type));
    else if (packType === 'tempest')
        pool = POKEMON_DB.filter((p) => ['Water', 'Electric', 'Dragon'].includes(p.type));
    else if (packType === 'shadow_ninja')
        pool = POKEMON_DB.filter((p) => ['Water', 'Fighting', 'Ghost', 'Psychic'].includes(p.type));
    else if (packType === 'eevee_heroes')
        pool = POKEMON_DB.filter((p) => ['Normal', 'Water', 'Electric', 'Fire'].includes(p.type));
    else if (packType === 'colossal')
        pool = POKEMON_DB.filter((p) => ['Fighting', 'Dragon', 'Normal'].includes(p.type));
    else if (packType === 'legendary') pool = POKEMON_DB.filter((p) => p.hp >= 130);

    if (pool.length === 0) pool = POKEMON_DB;
    const base = pool[Math.floor(Math.random() * pool.length)];

    let finalName = base.name;
    let finalHp = base.hp;
    let finalDmg = base.dmg;

    if (rarity === 'Holográfica') {
        finalName = `${base.name} Shiny`;
    } else if (rarity === 'EX') {
        finalName = `${base.name} EX`;
        finalHp += 70;
        finalDmg += 50;
    } else if (rarity === 'Mega EX') {
        if (base.hasMega) {
            finalName = `Mega ${base.name}`;
            finalHp += 130;
            finalDmg += 90;
        } else if (base.vmax) {
            finalName = `${base.name} VMAX`;
            finalHp += 150;
            finalDmg += 100;
        } else {
            rarity = 'EX';
            finalName = `${base.name} EX`;
            finalHp += 70;
            finalDmg += 50;
        }
    }

    return {
        ...base,
        id_instance: Math.random().toString(36).substring(7),
        finalName,
        finalHp,
        finalDmg,
        rarity,
    };
}

// === COMPONENTE VISUAL DA CARTA (LINDAS E PERFEITAS COM 3D) ===
function PokemonCard({
    data,
    size = 'large',
    attachedEnergy = [],
    isAttacking = false,
    attackClass = '',
}) {
    const isSmall = size === 'large';
    const cardRef = useRef(null);
    const [rotate, setRotate] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        if (isSmall || !cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        setRotate({ x: -y / 12, y: x / 12 });
    };
    const handleMouseLeave = () => setRotate({ x: 0, y: 0 });

    let imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`;
    if (data.rarity === 'Holográfica' || data.finalName.includes('Shiny')) {
        imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${data.id}.png`;
    }
    if (data.rarity === 'EX' && !data.finalName.includes('Mega')) {
        imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${data.id}.png`;
    }

    let holoClass = '';
    if (data.rarity === 'Holográfica') holoClass = 'holo-overlay';
    if (data.rarity === 'EX') holoClass = 'holo-overlay ex-holo';
    if (data.rarity === 'Mega EX') holoClass = 'holo-overlay mega-holo';

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative w-full h-full rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.8)] flex flex-col select-none overflow-hidden bg-slate-900 border transition-transform duration-200 ease-out ${data.rarity === 'Mega EX' ? 'border-yellow-400 border-[3px] shadow-[0_0_20px_rgba(255,215,0,0.4)]' : data.rarity === 'EX' ? 'border-cyan-300 border-2 shadow-[0_0_15px_rgba(0,255,255,0.3)]' : 'border-slate-700'} ${attackClass}`}
            style={{
                aspectRatio: '63/88',
                transform:
                    !isSmall && !attackClass
                        ? `perspective(800px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`
                        : 'none',
            }}>
            <div className="absolute inset-0 bg-slate-950 flex items-center justify-center type-bg">
                <div
                    className={`absolute inset-0 opacity-70 bg-type-${data.type.toLowerCase()}`}></div>
                <img
                    src={imgSrc}
                    className={`w-full h-full object-contain p-2 relative z-10 drop-shadow-2xl ${data.rarity.includes('Mega') ? 'scale-110' : 'scale-95'}`}
                    draggable="false"
                    alt={data.name}
                />
            </div>

            {holoClass && <div className={holoClass}></div>}

            {data.rarity.includes('EX') && (
                <div className="absolute top-2 left-2 z-30 pointer-events-none">
                    <div
                        className={`font-black italic px-2 py-0.5 rounded shadow-lg border border-white/40 text-[9px] ${data.rarity === 'Mega EX' ? 'bg-gradient-to-r from-amber-500 via-yellow-300 to-red-600 text-black' : 'bg-gradient-to-r from-cyan-400 to-blue-700 text-white'}`}>
                        {data.rarity}
                    </div>
                </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 bg-slate-950/90 backdrop-blur-md border-t border-white/20 p-2 flex justify-between items-center z-30 pointer-events-none shadow-[0_-5px_15px_rgba(0,0,0,0.5)]">
                <div className="flex flex-col flex-1 min-w-0">
                    <span
                        className={`font-black truncate ${isSmall ? 'text-[8px]' : 'text-[11px]'} text-white tracking-wide`}>
                        {data.finalName}
                    </span>
                    <span
                        className={`font-bold truncate ${isSmall ? 'text-[6px]' : 'text-[9px]'} text-amber-400`}>
                        {data.attack}{' '}
                        <span className="text-red-400 font-black drop-shadow-md">
                            ({data.finalDmg})
                        </span>
                    </span>
                </div>
                <div className="flex flex-col items-end shrink-0 pl-1">
                    <span
                        className={`font-black ${isSmall ? 'text-[8px]' : 'text-xs'} text-green-400 drop-shadow-md`}>
                        <span className="text-[6px] text-white/70 mr-0.5 font-bold">HP</span>
                        {data.finalHp}
                    </span>
                    {attachedEnergy.length > 0 && (
                        <div className="flex gap-0.5 mt-0.5 flex-wrap w-8 justify-end">
                            {attachedEnergy.map((_, i) => (
                                <span
                                    key={i}
                                    className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-yellow-300 to-amber-600 border border-black/80 block shadow-sm"></span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// === COMPONENTE VISUAL DE MINERAÇÃO ===
function CoinMineView({ setCoins, showToast }) {
    const [clicks, setClicks] = useState(0);
    const [clickAnims, setClickAnims] = useState([]);

    const handleMineClick = (e) => {
        playSound('mine');
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setClicks((prev) => prev + 1);
        const profit = 5;
        setCoins((c) => c + profit);

        const newAnim = { id: Math.random().toString(36).substring(7), x, y, profit };
        setClickAnims((prev) => [...prev, newAnim]);

        setTimeout(() => {
            setClickAnims((prev) => prev.filter((anim) => anim.id !== newAnim.id));
        }, 1000);
    };

    return (
        <div className="flex-1 flex flex-col items-center justify-center p-4 text-center max-w-md mx-auto relative select-none pb-12 animate-fade-in">
            <div className="mb-8">
                <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600 uppercase tracking-widest drop-shadow-md">
                    Mina de Moedas
                </h3>
                <p className="text-slate-400 text-xs mt-1">Extrai recursos clicando na joia.</p>
            </div>

            <div
                onClick={handleMineClick}
                className="relative w-60 h-60 bg-slate-900 border-2 border-slate-800 rounded-full flex items-center justify-center cursor-pointer shadow-[0_0_50px_rgba(245,158,11,0.15)] active:scale-95 transition-all duration-100 ease-out hover:border-yellow-500/50 hover:shadow-[0_0_80px_rgba(245,158,11,0.3)] group overflow-hidden">
                <div className="absolute inset-0 bg-radial-gradient from-yellow-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="w-28 h-28 bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-200 rounded-2xl transform rotate-45 flex items-center justify-center shadow-[0_0_40px_rgba(245,158,11,0.6)] border-2 border-yellow-100">
                    <div className="w-10 h-10 bg-white/40 rounded-full transform -rotate-45 animate-pulse blur-[2px]"></div>
                </div>

                {clickAnims.map((anim) => (
                    <span
                        key={anim.id}
                        className="absolute font-black tracking-widest pointer-events-none animate-float-up text-xl text-yellow-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                        style={{ left: anim.x, top: anim.y }}>
                        +{anim.profit}
                    </span>
                ))}
            </div>

            <div className="mt-10 text-[11px] text-slate-500 font-mono bg-slate-900 px-4 py-2 rounded-full border border-slate-800">
                Cliques na sessão: <span className="text-yellow-400 font-bold">{clicks}</span>
            </div>
        </div>
    );
}

// === COMPONENTE PRINCIPAL DOS COMBATES ===
function TcgBattleView({ collection, setCoins, showToast, onClose }) {
    const [deck, setDeck] = useState([]);
    const [battleStarted, setBattleStarted] = useState(false);
    const [playerActive, setPlayerActive] = useState(null);
    const [playerBench, setPlayerBench] = useState([]);
    const [aiActive, setAiActive] = useState(null);
    const [aiBench, setAiBench] = useState([]);
    const [turn, setTurn] = useState('player');
    const [battleLog, setBattleLog] = useState([]);
    const [damageAnims, setDamageAnims] = useState({ player: null, ai: null });
    const [attackAnims, setAttackAnims] = useState({ player: false, ai: false });
    const [timeLeft, setTimeLeft] = useState(10);

    const stateRef = useRef({ playerActive, aiActive, turn, playerBench, aiBench });
    useEffect(() => {
        stateRef.current = { playerActive, aiActive, turn, playerBench, aiBench };
    }, [playerActive, aiActive, turn, playerBench, aiBench]);

    const addLog = (msg) => setBattleLog((prev) => [msg, ...prev].slice(0, 15));

    useEffect(() => {
        if (!battleStarted || !stateRef.current.playerActive || !stateRef.current.aiActive) return;
        const timer = setInterval(() => {
            setTimeLeft((t) => {
                if (t <= 1) {
                    addLog(
                        `⏳ O tempo esgotou! Turno de ${stateRef.current.turn === 'player' ? 'Jogador' : 'IA'} ignorado.`,
                    );
                    setTurn((prev) => (prev === 'player' ? 'ai' : 'player'));
                    return 10;
                }
                return t - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [turn, battleStarted]);

    const toggleSelectCard = (card) => {
        playSound('click');
        if (deck.find((c) => c.id_instance === card.id_instance))
            setDeck(deck.filter((c) => c.id_instance !== card.id_instance));
        else if (deck.length < 3) setDeck([...deck, card]);
    };

    const startPartida = () => {
        if (deck.length < 3) return;
        playSound('click');
        const aiPool = Array.from({ length: 3 }).map(() => createCard('legendary'));
        setPlayerActive({ ...deck[0], currentHp: deck[0].finalHp, energyAttached: 0 });
        setPlayerBench(
            deck.slice(1).map((c) => ({ ...c, currentHp: c.finalHp, energyAttached: 0 })),
        );
        setAiActive({ ...aiPool[0], currentHp: aiPool[0].finalHp, energyAttached: 0 });
        setAiBench(aiPool.slice(1).map((c) => ({ ...c, currentHp: c.finalHp, energyAttached: 0 })));
        setBattleLog(['⚔️ Batalha iniciada!']);
        setBattleStarted(true);
        setTurn('player');
        setTimeLeft(10);
    };

    const handleNextPokemon = (isPlayer, oldEnergy, remainingBench) => {
        const nextPoke = { ...remainingBench[0], energyAttached: oldEnergy };
        if (isPlayer) {
            setPlayerActive(nextPoke);
            setPlayerBench(remainingBench.slice(1));
            addLog(`🔄 O teu ${nextPoke.finalName} entrou na batalha.`);
        } else {
            setAiActive(nextPoke);
            setAiBench(remainingBench.slice(1));
            addLog(`🤖 A IA enviou ${nextPoke.finalName}.`);
        }
    };

    const processVictory = (isPlayer) => {
        if (isPlayer) {
            setCoins((c) => c + 150);
            addLog(`🎉 VITÓRIA! Ganhaste exatamente 150 moedas.`);
            setTimeout(() => {
                showToast(`+150 Moedas!`);
                onClose();
            }, 3500);
        } else {
            addLog(`💔 DERROTA! A tua equipa foi eliminada.`);
            setTimeout(() => {
                showToast('Perdeste a batalha...');
                onClose();
            }, 3500);
        }
    };

    const attachEnergy = () => {
        if (turn !== 'player' || !playerActive) return;
        playSound('click');
        setPlayerActive((prev) => ({ ...prev, energyAttached: prev.energyAttached + 3 }));
        addLog(`🔋 Ganhaste 3 energias.`);
        setTurn('ai');
        setTimeLeft(10);
    };

    const swapPokemon = () => {
        if (turn !== 'player' || !playerActive || playerBench.length === 0) return;
        if (playerActive.energyAttached < 2)
            return showToast('Precisas de 2 energias para recuar!');

        playSound('click');
        const remainingEnergy = playerActive.energyAttached - 2;
        const oldActive = { ...playerActive, energyAttached: 0 };
        const nextActive = { ...playerBench[0], energyAttached: remainingEnergy };

        setPlayerActive(nextActive);
        setPlayerBench([...playerBench.slice(1), oldActive]);
        addLog(`🔄 Recuaste para ${nextActive.finalName}.`);
        setTurn('ai');
        setTimeLeft(10);
    };

    const executeAttack = (isPlayer) => {
        const s = stateRef.current;
        const attacker = isPlayer ? s.playerActive : s.aiActive;
        const defender = isPlayer ? s.aiActive : s.playerActive;
        if (!attacker || !defender) return;

        if (attacker.energyAttached < attacker.energyCost) {
            if (isPlayer)
                showToast(
                    `Precisas de ${attacker.energyCost} energias! Tens ${attacker.energyAttached}.`,
                );
            return false;
        }

        playSound('damage');
        setAttackAnims((prev) => ({ ...prev, [isPlayer ? 'player' : 'ai']: true }));
        setTimeout(
            () => setAttackAnims((prev) => ({ ...prev, [isPlayer ? 'player' : 'ai']: false })),
            500,
        );

        let dmg = attacker.finalDmg;
        let isWeak = defender.weakness === attacker.type;
        if (isWeak) dmg *= 2;

        const newHp = Math.max(0, defender.currentHp - dmg);

        if (isPlayer) {
            setDamageAnims((p) => ({ ...p, ai: `-${dmg}${isWeak ? ' (Fraqueza!)' : ''}` }));
            setTimeout(() => setDamageAnims((p) => ({ ...p, ai: null })), 1000);
            setAiActive((prev) => ({ ...prev, currentHp: newHp }));
        } else {
            setDamageAnims((p) => ({ ...p, player: `-${dmg}${isWeak ? ' (Fraqueza!)' : ''}` }));
            setTimeout(() => setDamageAnims((p) => ({ ...p, player: null })), 1000);
            setPlayerActive((prev) => ({ ...prev, currentHp: newHp }));
        }

        addLog(`💥 ${attacker.finalName} causou ${dmg} de dano!`);

        if (newHp <= 0) {
            addLog(`💀 ${defender.finalName} desmaiou!`);
            const bench = isPlayer ? s.aiBench : s.playerBench;
            const energyToPass = defender.energyAttached;

            if (bench.length === 0) {
                processVictory(isPlayer);
                return true;
            } else {
                handleNextPokemon(!isPlayer, energyToPass, bench);
            }
        }

        if (isPlayer) {
            setTurn('ai');
            setTimeLeft(10);
        } else {
            setTurn('player');
            setTimeLeft(10);
        }
        return true;
    };

    useEffect(() => {
        if (turn !== 'ai' || !battleStarted) return;
        const aiThinking = setTimeout(() => {
            const s = stateRef.current;
            if (!s.aiActive || !s.playerActive) return;

            const cost = s.aiActive.energyCost;
            if (s.aiActive.energyAttached >= cost) {
                executeAttack(false);
            } else {
                setAiActive((prev) => ({ ...prev, energyAttached: prev.energyAttached + 3 }));
                addLog(`🤖 IA acumulou 3 energias.`);
                setTurn('player');
                setTimeLeft(10);
            }
        }, 1500);
        return () => clearTimeout(aiThinking);
    }, [turn, battleStarted]);

    return (
        <div className="fixed inset-0 z-40 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 to-slate-950 text-white flex flex-col overflow-hidden">
            {!battleStarted ? (
                <div className="flex-1 flex flex-col p-4 pb-20 overflow-y-auto w-full max-w-md mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600 uppercase tracking-widest drop-shadow-md">
                            Montar Deck
                        </h3>
                        <button
                            onClick={onClose}
                            className="bg-red-600/20 border border-red-500/50 text-red-400 px-4 py-1.5 rounded-full font-bold text-xs uppercase hover:bg-red-600 hover:text-white transition-all shadow-md">
                            Sair
                        </button>
                    </div>
                    <p className="text-slate-300 text-xs mb-4">
                        Seleciona <strong className="text-yellow-300">3 cartas</strong> para o
                        combate. ({deck.length}/3)
                    </p>
                    {collection.length < 3 ? (
                        <div className="text-center p-6 text-slate-500">
                            ⚠️ Precisas de 3 cartas!
                        </div>
                    ) : (
                        <div className="grid grid-cols-3 gap-3 mb-20">
                            {collection.map((c, i) => (
                                <div
                                    key={c.id_instance + i}
                                    onClick={() => toggleSelectCard(c)}
                                    className={`cursor-pointer transition-all duration-300 ${deck.some((d) => d.id_instance === c.id_instance) ? 'ring-4 ring-yellow-400 scale-[1.05] rounded-xl shadow-[0_0_20px_rgba(255,215,0,0.5)] z-10' : 'opacity-80 hover:opacity-100'}`}>
                                    <PokemonCard data={c} size="large" />
                                </div>
                            ))}
                        </div>
                    )}
                    {deck.length === 3 && (
                        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-md border border-yellow-400 p-4 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] flex flex-col items-center gap-2 max-w-xs w-full z-50 animate-bounce">
                            <button
                                onClick={startPartida}
                                className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 py-3 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg hover:shadow-yellow-500/30 active:scale-95 transition-all">
                                Iniciar Duelo ⚔️
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex-1 flex flex-col relative bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 to-slate-950 p-3 justify-between w-full max-w-6xl mx-auto overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 opacity-[0.03] flex flex-col items-center pointer-events-none">
                        <span className="text-9xl font-black italic drop-shadow-2xl">
                            {timeLeft}
                        </span>
                    </div>

                    <div className="flex items-center justify-between bg-slate-900/80 backdrop-blur-md p-2.5 rounded-2xl border border-white/10 z-10 relative shadow-lg">
                        <div className="flex items-center gap-3">
                            <span className="text-[10px] bg-red-600/20 border border-red-500/50 text-red-400 px-2 py-1 rounded-lg font-black uppercase shadow-inner">
                                IA
                            </span>
                            <div className="text-left">
                                <p className="text-xs font-black tracking-wide">
                                    {aiActive?.finalName}
                                </p>
                                <div className="w-24 bg-slate-800 h-2.5 rounded-full mt-1 border border-black/50 shadow-inner overflow-hidden">
                                    <div
                                        className="bg-gradient-to-r from-red-600 to-red-400 h-full transition-all"
                                        style={{
                                            width: `${((aiActive?.currentHp || 0) / (aiActive?.finalHp || 1)) * 100}%`,
                                        }}></div>
                                </div>
                            </div>
                        </div>
                        <div className="text-right text-[10px]">
                            <p className="text-amber-400 font-bold bg-amber-900/30 px-2 py-0.5 rounded-full border border-amber-500/30">
                                ⚡ {aiActive?.energyAttached || 0}
                            </p>
                            <p className="text-slate-500 mt-1 font-mono">
                                Custo: {aiActive?.energyCost}
                            </p>
                        </div>
                    </div>

                    <div className="flex-1 flex items-center justify-around relative px-2 my-2 z-10">
                        <div className="relative w-[220px] h-[308px] transform rotate-1 drop-shadow-2xl">
                            <PokemonCard
                                data={aiActive}
                                size="large"
                                attachedEnergy={Array.from({
                                    length: aiActive?.energyAttached || 0,
                                })}
                                attackClass={attackAnims.ai ? 'anim-attack-ai' : ''}
                            />
                            {damageAnims.ai && (
                                <div className="absolute inset-0 bg-red-600/80 flex items-center justify-center font-black text-white text-center p-1 text-2xl z-30 animate-flash rounded-xl backdrop-blur-sm border-2 border-red-400">
                                    {damageAnims.ai}
                                </div>
                            )}
                        </div>

                        <div className="relative w-[220px] h-[308px] transform -rotate-1 drop-shadow-2xl">
                            <PokemonCard
                                data={playerActive}
                                size="large"
                                attachedEnergy={Array.from({
                                    length: playerActive?.energyAttached || 0,
                                })}
                                attackClass={attackAnims.player ? 'anim-attack-player' : ''}
                            />
                            {damageAnims.player && (
                                <div className="absolute inset-0 bg-red-600/80 flex items-center justify-center font-black text-white text-center p-1 text-2xl z-30 animate-flash rounded-xl backdrop-blur-sm border-2 border-red-400">
                                    {damageAnims.player}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 bg-slate-900/90 backdrop-blur-xl p-4 rounded-3xl border border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-10 relative">
                        <div className="flex justify-between items-center">
                            <div className="text-left">
                                <span
                                    className={`text-[9px] px-2.5 py-1 rounded-lg font-black uppercase tracking-widest shadow-inner ${turn === 'player' ? 'bg-blue-600/20 border border-blue-500/50 text-blue-400 animate-pulse' : 'bg-slate-800 border border-slate-700 text-slate-500'}`}>
                                    O Teu Turno
                                </span>
                                <p className="text-sm font-black text-white mt-1.5 tracking-wide">
                                    {playerActive?.finalName}
                                </p>
                                <div className="w-32 bg-slate-800 h-2.5 rounded-full mt-1 border border-black/50 shadow-inner overflow-hidden">
                                    <div
                                        className="bg-gradient-to-r from-green-600 to-green-400 h-full transition-all"
                                        style={{
                                            width: `${((playerActive?.currentHp || 0) / (playerActive?.finalHp || 1)) * 100}%`,
                                        }}></div>
                                </div>
                                <p className="text-[10px] text-slate-400 mt-1 font-mono">
                                    {playerActive?.currentHp} / {playerActive?.finalHp} HP
                                </p>
                            </div>
                            <div className="text-right text-[10px]">
                                <p className="text-yellow-400 font-bold bg-yellow-900/30 px-2 py-0.5 rounded-full border border-yellow-500/30">
                                    Energias: {playerActive?.energyAttached || 0} ⚡
                                </p>
                                <p className="text-slate-500 mt-1 font-mono">
                                    Custo Atq: {playerActive?.energyCost}
                                </p>
                            </div>
                        </div>

                        <div className="h-14 bg-slate-950/80 rounded-xl p-2 overflow-y-auto text-[10px] font-mono text-green-400/80 border border-black shadow-inner scrollbar-none">
                            {battleLog.map((log, idx) => (
                                <p key={idx} className="mb-0.5">
                                    {log}
                                </p>
                            ))}
                        </div>

                        <div className="grid grid-cols-3 gap-2 mt-1">
                            <button
                                onClick={attachEnergy}
                                disabled={turn !== 'player'}
                                className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-wide flex flex-col items-center justify-center border transition-all shadow-lg ${turn !== 'player' ? 'bg-slate-800 text-slate-600 border-slate-700' : 'bg-gradient-to-b from-yellow-400 to-amber-600 text-slate-950 border-yellow-300 active:scale-95 hover:shadow-yellow-500/20'}`}>
                                <span>+3 Energias</span>
                            </button>
                            <button
                                onClick={() => executeAttack(true)}
                                disabled={turn !== 'player'}
                                className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-wide flex flex-col items-center justify-center border transition-all shadow-lg ${turn !== 'player' ? 'bg-slate-800 text-slate-600 border-slate-700' : 'bg-gradient-to-b from-red-500 to-red-700 text-white border-red-400 active:scale-95 hover:shadow-red-500/20'}`}>
                                <span>Atacar</span>
                            </button>
                            <button
                                onClick={swapPokemon}
                                disabled={turn !== 'player' || playerBench.length === 0}
                                className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-wide flex flex-col items-center justify-center border transition-all shadow-lg ${turn !== 'player' || playerBench.length === 0 ? 'bg-slate-800 text-slate-600 border-slate-700' : 'bg-gradient-to-b from-blue-500 to-blue-800 text-white border-blue-400 active:scale-95 hover:shadow-blue-500/20'}`}>
                                <span>Trocar (-2)</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// === OVERLAY DE ABERTURA DOS BOOSTERS ===
function PackOpeningOverlay({ pack, booster, onComplete }) {
    const [index, setIndex] = useState(0);
    const [isRevealed, setIsRevealed] = useState(false);

    const handleTapCard = () => {
        playSound('click');
        if (!isRevealed) setIsRevealed(true);
        else if (index < 4) {
            setIndex(index + 1);
            setIsRevealed(false);
        } else onComplete();
    };

    return (
        <div
            className="fixed inset-0 z-50 bg-slate-950/98 flex flex-col items-center justify-center p-4 backdrop-blur-xl select-none cursor-pointer"
            onClick={handleTapCard}>
            <div className="text-white/40 text-[10px] mb-8 font-black tracking-[0.4em] uppercase">
                Carta {index + 1} de 5
            </div>
            <div
                key={index}
                className="w-64 h-[358px] perspective-1000 cursor-pointer drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                <div
                    className={`relative w-full h-full transition-transform duration-[800ms] preserve-3d ease-in-out ${isRevealed ? 'rotate-y-180 scale-110' : 'hover:scale-105'}`}>
                    <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-blue-700 to-blue-950 rounded-xl border-[10px] border-yellow-500 flex items-center justify-center shadow-inner">
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600 font-black tracking-widest text-xl drop-shadow-md">
                            POKÉMON
                        </span>
                    </div>
                    <div className="absolute inset-0 backface-hidden rotate-y-180">
                        <PokemonCard data={pack[index]} />
                    </div>
                </div>
            </div>
            <div className="mt-12 text-white/60 font-black tracking-widest text-center h-8 text-[10px] uppercase animate-pulse">
                {!isRevealed ? '👆 Toca para virar' : index < 4 ? 'Avançar ➡️' : 'Guardar 🗃️'}
            </div>
        </div>
    );
}

// === APP PRINCIPAL COM INTEGRAÇÃO LOCAL ===
export default function App() {
    const [coins, setCoins] = useState(() => {
        try {
            const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
            return saved ? JSON.parse(saved).coins || 0 : 300;
        } catch {
            return 300;
        }
    });

    const [collection, setCollection] = useState(() => {
        try {
            const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
            return saved ? JSON.parse(saved).collection || [] : [];
        } catch {
            return [];
        }
    });

    const [activeTab, setActiveTab] = useState('store');
    const [openingPack, setOpeningPack] = useState(null);
    const [openedCards, setOpenedCards] = useState([]);
    const [battleOpen, setBattleOpen] = useState(false);
    const [toast, setToast] = useState({ message: '', visible: false });

    // Salvar dados localmente sempre que moedas ou coleção mudarem
    useEffect(() => {
        const saveToLocal = () => {
            try {
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ coins, collection }));
            } catch (e) {
                console.error('Erro ao salvar progresso:', e);
            }
        };
        const timer = setTimeout(saveToLocal, 500);
        return () => clearTimeout(timer);
    }, [coins, collection]);

    const showToast = (message) => {
        setToast({ message, visible: true });
        setTimeout(() => setToast({ message: '', visible: false }), 2500);
    };

    const buyBooster = (booster) => {
        playSound('click');
        if (coins < booster.cost) return showToast('Moedas insuficientes!');
        setCoins((c) => c - booster.cost);
        playSound('pack_rip');
        setOpenedCards(Array.from({ length: 5 }).map(() => createCard(booster.id)));
        setOpeningPack(booster);
    };

    const onOpeningComplete = () => {
        setCollection((prev) => [...prev, ...openedCards]);
        setOpeningPack(null);
        setOpenedCards([]);
        showToast('5 Novas cartas guardadas no Álbum!');
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center font-sans select-none pb-10 overflow-x-hidden">
            <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }

        .holo-overlay { position: absolute; inset: 0; mix-blend-mode: color-dodge; opacity: 0.4; pointer-events: none; z-index: 10; background: linear-gradient(135deg, rgba(255,255,255,0) 20%, rgba(255,255,255,0.9) 40%, rgba(255,255,255,0.9) 60%, rgba(255,255,255,0) 80%); background-size: 200% 200%; animation: holo-slide 6s infinite linear; }
        .ex-holo { background: linear-gradient(135deg, rgba(0,255,255,0.5) 10%, rgba(255,0,255,0.5) 50%, rgba(255,255,0,0.5) 90%); opacity: 0.55; mix-blend-mode: overlay; animation: holo-slide 4s infinite linear; }
        .mega-holo { background: radial-gradient(circle, rgba(255,223,0,0.7) 0%, rgba(255,0,128,0.5) 60%, rgba(0,191,255,0.5) 100%); opacity: 0.7; mix-blend-mode: color-dodge; animation: pulse 3s infinite alternate; }
        @keyframes holo-slide { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }

        @keyframes attack-player { 0% { transform: translate(0, 0) rotate(-1deg); } 50% { transform: translate(40px, -60px) scale(1.1) rotate(15deg); z-index: 50; } 100% { transform: translate(0, 0) rotate(-1deg); } }
        @keyframes attack-ai { 0% { transform: translate(0, 0) rotate(1deg); } 50% { transform: translate(-40px, 60px) scale(1.1) rotate(-15deg); z-index: 50; } 100% { transform: translate(0, 0) rotate(1deg); } }
        .anim-attack-player { animation: attack-player 0.4s ease-in-out forwards; }
        .anim-attack-ai { animation: attack-ai 0.4s ease-in-out forwards; }

        @keyframes float-up { 0% { transform: translateY(0) scale(1); opacity: 1; } 100% { transform: translateY(-100px) scale(0.8); opacity: 0; } }
        .animate-float-up { animation: float-up 1s forwards cubic-bezier(0.18, 0.89, 0.32, 1.28); }

        .bg-type-fire { background: radial-gradient(circle, rgba(255,69,0,0.9) 0%, rgba(139,0,0,1) 100%); }
        .bg-type-water { background: radial-gradient(circle, rgba(0,191,255,0.9) 0%, rgba(0,0,139,1) 100%); }
        .bg-type-grass { background: radial-gradient(circle, rgba(50,205,50,0.9) 0%, rgba(0,100,0,1) 100%); }
        .bg-type-electric { background: radial-gradient(circle, rgba(255,255,0,0.9) 0%, rgba(218,165,32,1) 100%); }
        .bg-type-psychic { background: radial-gradient(circle, rgba(255,20,147,0.9) 0%, rgba(128,0,128,1) 100%); }
        .bg-type-ghost { background: radial-gradient(circle, rgba(148,0,211,0.9) 0%, rgba(75,0,130,1) 100%); }
        .bg-type-dragon { background: radial-gradient(circle, rgba(255,140,0,0.9) 0%, rgba(72,61,139,1) 100%); }
        .bg-type-fighting { background: radial-gradient(circle, rgba(165,42,42,0.9) 0%, rgba(128,0,0,1) 100%); }
        .bg-type-normal { background: radial-gradient(circle, rgba(192,192,192,0.9) 0%, rgba(105,105,105,1) 100%); }
      `}</style>

            <header className="sticky top-0 z-30 bg-slate-900/80 backdrop-blur-xl border-b border-white/5 px-4 py-3 flex justify-between items-center w-full max-w-5xl shadow-md">
                <div className="flex flex-col">
                    <span className="text-[9px] font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500 uppercase">
                        Simulador Local
                    </span>
                    <span className="text-sm font-black italic tracking-wide text-white drop-shadow-md">
                        POKÉMON TCG
                    </span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="bg-slate-950/80 px-3 py-1.5 rounded-full border border-yellow-400/40 flex items-center gap-1.5 shadow-[0_0_10px_rgba(255,215,0,0.15)]">
                        <span className="text-yellow-400 font-bold">🪙</span>
                        <span className="text-xs font-black font-mono text-yellow-300 tracking-wide">
                            {coins}
                        </span>
                    </div>
                </div>
            </header>

            <main className="flex-1 w-full flex justify-center overflow-y-auto px-4 py-2">
                {activeTab === 'store' && (
                    <div className="max-w-md mx-auto flex flex-col gap-4 animate-fade-in pb-8">
                        <div className="text-center py-4">
                            <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400 italic tracking-widest uppercase drop-shadow-sm">
                                Boosters
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {BOOSTERS.map((booster) => (
                                <div
                                    key={booster.id}
                                    className="relative rounded-3xl bg-slate-900/80 backdrop-blur-sm border border-white/10 p-4 flex gap-4 overflow-hidden shadow-xl items-center group transition-transform hover:-translate-y-1">
                                    <div
                                        className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-b ${booster.color} blur-3xl opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity`}></div>
                                    <div className="w-20 h-24 bg-slate-950 rounded-2xl flex items-center justify-center shrink-0 border border-white/10 relative shadow-inner">
                                        <div
                                            className={`absolute inset-0 bg-gradient-to-b ${booster.color} opacity-30 rounded-2xl`}></div>
                                        <img
                                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${booster.cover}.png`}
                                            alt={booster.name}
                                            className="w-16 h-16 object-contain relative z-10 drop-shadow-[0_5px_10px_rgba(0,0,0,0.8)] group-hover:scale-110 transition-transform"
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-col min-w-0 justify-center">
                                        <span className="text-sm font-black tracking-wide truncate text-white drop-shadow-md">
                                            {booster.name}
                                        </span>
                                        <span className="text-[10px] text-slate-400 mt-1 leading-snug">
                                            {booster.desc}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => buyBooster(booster)}
                                        className="px-4 py-3 bg-gradient-to-b from-yellow-400 to-amber-600 text-slate-950 rounded-2xl font-black text-xs flex flex-col items-center shadow-lg active:scale-95 hover:shadow-yellow-500/30 transition-all border border-yellow-300">
                                        <span>🪙 {booster.cost}</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'mine' && <CoinMineView setCoins={setCoins} showToast={showToast} />}

                {activeTab === 'collection' && (
                    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 animate-fade-in pb-12 px-6">
                        <div className="flex justify-between items-center py-2">
                            <h3 className="text-xl font-black uppercase italic tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400">
                                Álbum
                            </h3>
                            <div className="text-[10px] text-slate-400 bg-slate-900 px-3 py-1.5 rounded-full border border-white/5 shadow-inner">
                                Cartas:{' '}
                                <strong className="text-yellow-400">{collection.length}</strong>
                            </div>
                        </div>
                        {collection.length === 0 ? (
                            <div className="text-center p-12 text-slate-500 font-bold border-2 border-dashed border-slate-800 rounded-3xl mt-10">
                                Vazio. Abre alguns boosters!
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 justify-items-center">
                                {collection.map((card, i) => (
                                    <div
                                        key={card.id_instance + i}
                                        className="relative w-full max-w-[200px] aspect-[63/88] cursor-pointer hover:scale-[1.05] transition-transform drop-shadow-xl"
                                        onClick={() => playSound('click')}>
                                        <PokemonCard data={card} size="large" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </main>

            {toast.visible && (
                <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-slate-900 border border-yellow-400 text-yellow-300 font-black text-xs px-6 py-3 rounded-full shadow-[0_10px_40px_rgba(255,215,0,0.3)] tracking-widest uppercase animate-bounce whitespace-nowrap">
                    {toast.message}
                </div>
            )}

            {openingPack && openedCards.length === 5 && (
                <PackOpeningOverlay
                    pack={openedCards}
                    booster={openingPack}
                    onComplete={onOpeningComplete}
                />
            )}
            {battleOpen && (
                <div className="fixed inset-0 z-[9999] bg-slate-950 flex items-center justify-center p-4">
                    <div className="w-full max-w-6xl">
                        <TcgBattleView
                            collection={collection}
                            setCoins={setCoins}
                            showToast={showToast}
                            onClose={() => setBattleOpen(false)}
                        />
                    </div>
                </div>
            )}

            {/* NOVO MENU LATERAL FLUTUANTE DE NAVEGAÇÃO */}
            <div className="fixed right-4 bottom-10 z-40 flex flex-col gap-3">
                <button
                    onClick={() => {
                        playSound('click');
                        setActiveTab('store');
                    }}
                    title="Loja de Boosters"
                    className={`w-14 h-14 rounded-full border-2 shadow-[0_5px_15px_rgba(0,0,0,0.5)] flex items-center justify-center transition-all ${activeTab === 'store' ? 'bg-yellow-400 border-white text-slate-900 scale-110' : 'bg-slate-800 border-slate-600 text-white hover:bg-slate-700'}`}>
                    <span className="text-2xl drop-shadow-md">🛒</span>
                </button>
                <button
                    onClick={() => {
                        playSound('click');
                        setActiveTab('mine');
                    }}
                    title="Mina de Ouro"
                    className={`w-14 h-14 rounded-full border-2 shadow-[0_5px_15px_rgba(0,0,0,0.5)] flex items-center justify-center transition-all ${activeTab === 'mine' ? 'bg-yellow-400 border-white text-slate-900 scale-110' : 'bg-slate-800 border-slate-600 text-white hover:bg-slate-700'}`}>
                    <span className="text-2xl drop-shadow-md">💎</span>
                </button>
                <button
                    onClick={() => {
                        playSound('click');
                        setActiveTab('collection');
                    }}
                    title="O teu Álbum"
                    className={`w-14 h-14 rounded-full border-2 shadow-[0_5px_15px_rgba(0,0,0,0.5)] flex items-center justify-center transition-all ${activeTab === 'collection' ? 'bg-yellow-400 border-white text-slate-900 scale-110' : 'bg-slate-800 border-slate-600 text-white hover:bg-slate-700'}`}>
                    <span className="text-2xl drop-shadow-md">🗂️</span>
                </button>
                <div className="w-full h-px bg-white/20 my-1"></div> {/* Divisor */}
                <button
                    onClick={() => {
                        playSound('click');
                        setBattleOpen(true);
                    }}
                    title="Modo Batalha"
                    className="w-14 h-14 rounded-full border-2 border-white/80 bg-gradient-to-br from-red-500 to-red-800 text-white shadow-[0_10px_30px_rgba(220,38,38,0.6)] flex items-center justify-center text-2xl hover:scale-110 active:scale-95 transition-all">
                    ⚔️
                </button>
            </div>
        </div>
    );
}
