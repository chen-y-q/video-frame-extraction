const inp = document.querySelector('.file-btn');
inp.onchange = (e) => {
  file = e.target.files[0];
};

const inp2 = document.querySelector('.num');
let num = 1;
inp2.addEventListener('input', function () {
  num = this.value;
});


let file;

function captureFrame(file, time = 0) {
  return new Promise((resolve) => {
    const vdo = document.createElement('video');
    vdo.src = URL.createObjectURL(file);
    vdo.currentTime = time;
    vdo.muted = true;
    vdo.autoplay = true;
    vdo.oncanplay = () => {
      const cvs = document.createElement('canvas');
      cvs.width = vdo.videoWidth;
      cvs.height = vdo.videoHeight;
      const ctx = cvs.getContext('2d');
      ctx.drawImage(vdo, 0, 0, cvs.width, cvs.height);
      cvs.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        console.log(url);
        console.log(blob);
        resolve(url);
      });
    };
  });
}


const startBtn = document.querySelector('.btn');

startBtn.addEventListener('click', async () => {
  for (let i = 0; i < num; i++) {
    const frame = await captureFrame(file, i);
    const img = document.createElement('img');
    img.src = frame;
    document.body.appendChild(img);
  }
});
