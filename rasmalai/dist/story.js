"use strict";

// Each chapter owns its picture, caption, letter and two replies.
const chapters = [
  {
    title: ["Suno,", "Rasmalai."],
    lines: ["Tumhara naam screen pe aata hai,", "aur main muskura deta hoon."],
    question: "Ek chhoti si baat kahoon?",
    replies: ["Haan, kaho", "Abhi nahi"],
    caption: "my favourite human",
    image: "assets/scene-1.webp",
    alt: "Gulaabi phoolon ke beech muskuraati hui Rasmalai ka anime portrait"
  },
  {
    title: ["Tumhari", "hansi."],
    lines: ["Chai mein cheeni daalna bhool gaya tha,", "tum hansi toh chai bhi meethi lagi."],
    question: "Ab samjhi, Rasmalai kyun bulaata hoon?",
    replies: ["Achha ji, aur?", "Peechhe"],
    caption: "a little sweeter with you",
    image: "assets/scene-2.webp",
    alt: "Ek chhote se café mein chai ke saath muskuraati Rasmalai"
  },
  {
    title: ["Ek dhun,", "tum si."],
    lines: ["Kuch gaane pehli baar sunta hoon,", "phir bhi unmein tum mil jaati ho."],
    question: "Agla sur bhi sunogi?",
    replies: ["Haan, sunao", "Peechhe"],
    caption: "you sound like home",
    image: "assets/scene-3.webp",
    alt: "Headphones lagaaye apni dhun mein khoyi Rasmalai"
  },
  {
    title: ["Ek panna,", "humaara."],
    lines: ["Kitaab mein ek phool rakhte hain jaise,", "waise hi sambhaali hain tumhari baatein."],
    question: "Ek naya panna saath likhein?",
    replies: ["Chalo, likhein", "Peechhe"],
    caption: "between the pages",
    image: "assets/scene-4.webp",
    alt: "Kitaabon ke beech ek sukoon bhara pal bitaati Rasmalai"
  },
  {
    title: ["Ek chai,", "saath mein?"],
    lines: ["Tum saamne baitho, main kisse sunaaoon,", "chai thandi ho jaaye, toh aur mangaaoon."],
    question: "Is baar use date bula lein?",
    replies: ["Haan, date!", "Dost banke"],
    caption: "save me a sunset",
    image: "assets/scene-5.webp",
    alt: "Dhalti shaam ke gulaabi baagh mein Rasmalai"
  },
  {
    title: ["Date", "pakki!"],
    lines: ["Jagah tum chunna, chai meri taraf se.", "Aur haan, rasmalai bhi."],
    question: "Ab toh shaam ka intezaar rahega. ♡",
    replies: ["Teddy se milo", "Peechhe"],
    caption: "to our next chapter",
    image: "assets/scene-6.webp",
    alt: "Taaron bhari raat mein balcony par khadi Rasmalai"
  },
  {
    title: ["Umr bhar,", "saath?"],
    lines: ["Har subah ki chai, har raat ki baat…", "sab tumhare saath, Rasmalai."],
    question: "Kya tum zindagi bhar mera saath dogi?",
    replies: ["Haan, dungi", "Abhi nahi"],
    caption: "a little bear, a big question",
    image: "assets/scene-7.webp",
    alt: "Gulaabi dil seene se lagaaye, panja uthaakar sawaal poochhta ek pyaara teddy"
  }
];

const lastIndex = chapters.length - 1;
const finalLetters = {
  accepted: {
    ...chapters[lastIndex],
    title: ["Tum aur", "main."],
    lines: ["Tumhari haan ko is chhote se dil mein rakh liya.", "Ab saath milkar apni kahaani likhenge."],
    question: "Pehli chai ab bhi meri taraf se. ♡",
    caption: "our story starts here",
    replies: ["Phir se padhein", "Peechhe"]
  },
  later: {
    ...chapters[lastIndex],
    title: ["Jab mann", "kare."],
    lines: ["Koi jaldi nahi, Rasmalai.", "Tumhari dosti mere liye bahut pyaari hai."],
    question: "Teddy ki taraf se ek jhappi. ♡",
    caption: "a hug for you",
    replies: ["Phir se padhein", "Peechhe"]
  }
};

const friendshipEnding = {
  ...chapters[5],
  title: ["Dosti", "pakki."],
  lines: ["Chai phir bhi meri taraf se, Rasmalai.", "Tum meri dost ho, yeh kitni pyaari baat hai."],
  question: "Agli chai pe phir milenge. ♡",
  caption: "my favourite friend"
};

const pauseLetter = {
  ...chapters[0],
  title: ["Jab mann", "kare."],
  lines: ["Chitthi yahin rakh deta hoon, Rasmalai.", "Jab fursat mile, aaraam se padhna."],
  question: "Tab tak, ek muskaan tumhare naam. ♡",
  replies: ["Ab sunao", "Shuruat par"],
  caption: "take your time"
};

const el = id => document.getElementById(id);
const letter = document.querySelector(".letter");
const progress = document.querySelector(".page-progress");
const dots = [...document.querySelectorAll(".dots i")];
const song = el("song");
const musicButton = el("music-switch");
let chapterIndex = 0;
let paused = false;
let friends = false;
let changeNumber = 0;
let finalReply = null;
let acknowledged = false;
const receiptKey = "dear-rasmalai-lifetime-yes-v1";
try { acknowledged = localStorage.getItem(receiptKey) === "accepted"; } catch {}
const mailNote = el("mail-note");
const consentText = "Haan chunogi toh tumhara jawaab Nisarg ko email se jaayega.";
const notifyUrl = "https://formsubmit.co/ajax/nisargpanchal2006@gmail.com";
const letterUrl = "https://dear-rasmalai-keepsake.floweryclock8.chatgpt.site/";

async function sendAcceptance() {
  if (acknowledged) return;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 45000);
  try {
    const response = await fetch(notifyUrl, {
      method: "POST",
      headers: {"Content-Type": "application/json", "Accept": "application/json"},
      credentials: "omit",
      signal: controller.signal,
      body: JSON.stringify({
        _url: letterUrl,
        _subject: "निसर्ग, आपकी गर्लफ्रेंड ने हाँ कह दी है! 💌",
        "रसमलाई का जवाब": "हाँ, मैं ज़िंदगी भर तुम्हारा साथ दूँगी। ❤️",
        "संदेश": "निसर्ग, आपकी रसमलाई ने टेडी की आख़िरी चिट्ठी पढ़कर ‘हाँ’ चुना है। आपकी कहानी के इस नए पन्ने पर ढेर सारा प्यार! 🧸"
      })
    });
    const result = await response.json();
    if (/needs activation/i.test(String(result.message))) throw new Error("Activation pending");
    if (!response.ok || String(result.success) !== "true") throw new Error("Submission unconfirmed");
    acknowledged = true;
    try { localStorage.setItem(receiptKey, "accepted"); } catch {}
  } finally {
    clearTimeout(timeout);
  }
}

function render() {
  const teddyPage = chapterIndex === lastIndex;
  let chapter = chapters[chapterIndex];
  if (paused) chapter = pauseLetter;
  if (chapterIndex === 5 && friends) chapter = friendshipEnding;
  if (teddyPage && finalReply) chapter = finalLetters[finalReply];
  const count = String(chapterIndex + 1).padStart(2, "0");
  el("opening").textContent = chapter.title[0];
  el("name").textContent = chapter.title[1];
  el("verse").replaceChildren(chapter.lines[0], document.createElement("br"), chapter.lines[1]);
  el("question").textContent = chapter.question;
  el("yes-text").textContent = chapter.replies[0];
  el("no-text").textContent = chapter.replies[1];
  el("caption").textContent = chapter.caption;
  el("portrait").src = chapter.image;
  el("portrait").alt = chapter.alt;
  el("mini-orbit").hidden = chapterIndex !== 2;
  letter.classList.toggle("teddy-page", teddyPage);
  letter.classList.toggle("asking", teddyPage && !finalReply);
  letter.classList.toggle("celebrate", teddyPage && finalReply === "accepted");
  const bubble = el("teddy-bubble");
  bubble.hidden = !teddyPage;
  if (teddyPage) {
    el("muzzle").src = chapter.image;
    bubble.textContent = finalReply === "accepted" ? "हमेशा साथ! ♡" : finalReply === "later" ? "एक झप्पी! ♡" : "मेरा साथ दोगी? ♡";
  }
  mailNote.hidden = !teddyPage || !!finalReply;
  mailNote.textContent = mailNote.hidden ? "" : consentText;
  el("chapter").textContent = "CHAPTER " + count + " / " + String(chapters.length).padStart(2, "0");
  el("count").textContent = count;
  progress.setAttribute("aria-valuenow", String(chapterIndex + 1));
  dots.forEach((dot, index) => {
    dot.classList.toggle("now", index === chapterIndex);
    dot.classList.toggle("read", index < chapterIndex);
  });
  letter.classList.remove("arriving");
  void letter.offsetWidth;
  letter.classList.add("arriving");
  el("title").focus({preventScroll:true});
  const next = chapters[chapterIndex + 1];
  if (next) preloadPortrait(next.image);
}

const loadedPortraits = new Map();
function preloadPortrait(src) {
  if (loadedPortraits.has(src)) return loadedPortraits.get(src);
  const img = new Image();
  img.src = src;
  const ready = img.decode().catch(() => {});
  loadedPortraits.set(src, ready);
  return ready;
}

async function respond(affirmative) {
  const version = ++changeNumber;
  let target = chapterIndex;
  if (paused) {
    paused = false;
    target = affirmative ? 1 : 0;
  } else if (chapterIndex === 0 && !affirmative) {
    paused = true;
  } else if (chapterIndex === 4) {
    friends = !affirmative;
    target = 5;
  } else if (chapterIndex === lastIndex && finalReply) {
    finalReply = null;
    target = affirmative ? 0 : lastIndex - 1;
    if (affirmative) friends = false;
  } else if (chapterIndex === lastIndex) {
    if (affirmative) {
      el("yes").disabled = el("no").disabled = true;
      el("yes-text").textContent = "Bhej rahe hain…";
      mailNote.textContent = "Tumhara jawaab email ke liye bhej rahe hain…";
      try {
        await sendAcceptance();
        finalReply = "accepted";
      } catch (error) {
        mailNote.textContent = error.message === "Activation pending"
          ? "Nisarg ko pehle apna email confirm karna hai. Uske baad phir koshish kar sakti ho."
          : "Jawaab bhejne ki pushti nahi mili. Internet check karke phir koshish karo.";
        el("yes-text").textContent = "Phir bhejein";
        return;
      } finally {
        el("yes").disabled = el("no").disabled = false;
      }
    } else {
      finalReply = "later";
    }
  } else if (chapterIndex === 5 && affirmative) {
    target = lastIndex;
    if (acknowledged) {
      finalReply = "accepted";
    }
  } else {
    target += affirmative ? 1 : -1;
  }
  const buttons = [el("yes"),el("no")];
  buttons.forEach(button => button.disabled = true);
  try {
    await preloadPortrait(chapters[target].image);
    if (version === changeNumber) {
      chapterIndex = target;
      render();
    }
  } finally {
    buttons.forEach(button => button.disabled = false);
  }
}
el("yes").addEventListener("click", () => respond(true));
el("no").addEventListener("click", () => respond(false));
preloadPortrait(chapters[1].image);

function showMusic(playing) {
  musicButton.setAttribute("aria-pressed", String(playing));
  musicButton.setAttribute("aria-label", playing ? "Pause music" : "Play music");
  el("music-label").textContent = playing ? "Music on" : "Music off";
}

let userPausedMusic = false;
let unlockListenersAttached = false;
let canplayRetryBound = false;
const unlockEvents = ["pointerdown", "touchend", "click", "keydown"];

function onUnlockGesture(event) {
  if (userPausedMusic) return;
  if (event.target instanceof Element && event.target.closest("#music-switch")) return;
  attemptPlay();
}

function attachUnlockListeners() {
  if (unlockListenersAttached || userPausedMusic) return;
  unlockListenersAttached = true;
  unlockEvents.forEach(type => {
    document.addEventListener(type, onUnlockGesture, true);
  });
}

function detachUnlockListeners() {
  if (!unlockListenersAttached) return;
  unlockListenersAttached = false;
  unlockEvents.forEach(type => {
    document.removeEventListener(type, onUnlockGesture, true);
  });
}

async function attemptPlay() {
  if (userPausedMusic) return false;
  song.loop = true;
  song.volume = 0.5;
  try {
    await song.play();
    detachUnlockListeners();
    return true;
  } catch (err) {
    if (!userPausedMusic) attachUnlockListeners();
    if (err && err.name !== "NotAllowedError" && !canplayRetryBound) {
      canplayRetryBound = true;
      song.addEventListener("canplay", () => {
        canplayRetryBound = false;
        if (!userPausedMusic && song.paused) attemptPlay();
      }, { once: true });
    }
    return false;
  }
}

song.loop = true;
song.volume = 0.5;
song.addEventListener("playing", () => {
  showMusic(true);
  detachUnlockListeners();
});
song.addEventListener("pause", () => showMusic(false));
song.addEventListener("ended", () => {
  if (!userPausedMusic) {
    song.currentTime = 0;
    attemptPlay();
  }
});
song.addEventListener("error", () => {
  showMusic(false);
  el("announcement").textContent = "Dhun abhi chal nahi paayi.";
});
document.addEventListener("visibilitychange", () => {
  if (!document.hidden && !userPausedMusic && song.paused) {
    attemptPlay();
  }
});
window.addEventListener("pageshow", () => {
  if (!userPausedMusic && song.paused) {
    attemptPlay();
  }
});
musicButton.addEventListener("click", async () => {
  if (!song.paused) {
    userPausedMusic = true;
    detachUnlockListeners();
    song.pause();
    return;
  }
  userPausedMusic = false;
  song.loop = true;
  song.volume = 0.5;
  try {
    await song.play();
    detachUnlockListeners();
  } catch {
    showMusic(false);
    el("announcement").textContent = "Dhun abhi chal nahi paayi. Phir se tap karein.";
  }
});

attemptPlay();
