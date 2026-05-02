let selectedCategory = "General";
let history = [];

// Category selection
document.getElementById("categories").addEventListener("click", (e) => {
  if (!e.target.classList.contains("cat")) return;
  document.querySelectorAll(".cat").forEach(b => b.classList.remove("active"));
  e.target.classList.add("active");
  selectedCategory = e.target.dataset.cat;
});

// Char counter
document.getElementById("ideaInput").addEventListener("input", (e) => {
  document.getElementById("charCount").textContent = e.target.value.length;
});

// Ctrl+Enter
document.getElementById("ideaInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter" && e.ctrlKey) generatePrompt();
});

// Generate button
document.getElementById("generateBtn").addEventListener("click", generatePrompt);

// Copy button
document.getElementById("copyBtn").addEventListener("click", () => {
  const text = document.getElementById("resultText").innerText;
  navigator.clipboard.writeText(text);
  const btn = document.getElementById("copyBtn");
  btn.classList.add("copied");
  document.getElementById("copyIcon").textContent = "✓";
  document.getElementById("copyText").textContent = "Copied!";
  setTimeout(() => {
    btn.classList.remove("copied");
    document.getElementById("copyIcon").textContent = "⎘";
    document.getElementById("copyText").textContent = "Copy";
  }, 2000);
});

async function generatePrompt() {
  const idea = document.getElementById("ideaInput").value.trim();
  if (!idea) {
    document.getElementById("ideaInput").focus();
    return;
  }

  // Show loading
  document.getElementById("loadingOverlay").classList.add("active");
  document.getElementById("generateBtn").disabled = true;

  try {
    const response = await fetch("/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idea, category: selectedCategory })
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error);

    // Show result
    document.getElementById("resultText").innerText = data.result;
    const resultCard = document.getElementById("resultCard");
    resultCard.style.display = "block";
    setTimeout(() => resultCard.classList.add("visible"), 10);
    resultCard.scrollIntoView({ behavior: "smooth", block: "nearest" });

    // Add to history
    addToHistory(idea, selectedCategory, data.result);

  } catch (err) {
    alert("⚠️ " + err.message);
  } finally {
    document.getElementById("loadingOverlay").classList.remove("active");
    document.getElementById("generateBtn").disabled = false;
  }
}

function addToHistory(idea, category, prompt) {
  history.unshift({
    idea: idea.slice(0, 55) + (idea.length > 55 ? "…" : ""),
    category,
    prompt,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  });
  if (history.length > 5) history.pop();
  renderHistory();
}

function renderHistory() {
  const section = document.getElementById("historySection");
  const list = document.getElementById("historyList");

  if (history.length === 0) { section.style.display = "none"; return; }

  section.style.display = "block";
  list.innerHTML = history.map((item, i) => `
    <button class="history-item" onclick="loadHistory(${i})">
      <span>${item.idea}</span>
      <span class="history-meta">[${item.category}] ${item.time}</span>
    </button>
  `).join("");
}

function loadHistory(index) {
  const item = history[index];
  document.getElementById("ideaInput").value = item.idea;
  document.getElementById("charCount").textContent = item.idea.length;
  document.getElementById("resultText").innerText = item.prompt;
  const resultCard = document.getElementById("resultCard");
  resultCard.style.display = "block";
  setTimeout(() => resultCard.classList.add("visible"), 10);
}