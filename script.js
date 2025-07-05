import { PALAVRAS_RUINS } from './palavrasRuins.js';

const input = document.getElementById('input-text');
const btn = document.getElementById('btn-analyze');
const output = document.getElementById('output-result');

btn.addEventListener('click', () => {
  const texto = input.value.trim();

  if (!texto) {
    output.textContent = 'Digite ou cole um texto!';
    return;
  }

  const palavras = texto
    .toLowerCase()
    .split(/[^a-zá-úà-ü]+/i)
    .filter(p => p.length > 2 && !PALAVRAS_RUINS.has(p));

  if (palavras.length === 0) {
    output.textContent = 'Nenhuma palavra relevante encontrada.';
    return;
  }

  const frequencia = {};
  for (const p of palavras) {
    frequencia[p] = (frequencia[p] || 0) + 1;
  }

  const topPalavras = Object.entries(frequencia)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  output.innerHTML = topPalavras
    .map(([palavra, contagem]) => `🟪 <strong>${palavra}</strong> apareceu ${contagem}x`)
    .join('<br>');
});

