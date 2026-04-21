// Draw stars on canvas
function generateStars() {
    const canvas = document.getElementById('stars');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    for (let i = 0; i < 200; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 1.5;
        const opacity = Math.random();
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
    }
}

generateStars();

setTimeout(() => {
    // Phase 1 fades out
    document.querySelector('.Phase1').style.opacity = '0';

    // Stars fade in at the same time Phase 1 fades out
    document.getElementById('stars').style.opacity = '1';

    setTimeout(() => {
        // Phase 2 fades in and scales down
        document.querySelector('.Phase2').style.opacity = '1';
        document.querySelector('#Phase2Title').style.animation = 'scaleDown 15s ease-in forwards';

        setTimeout(() => {
            // Phase 3 blends in while Phase 2 is still visible
            document.querySelector('.Phase3').style.opacity = '1';

            // Start crawl after Phase 3 has faded in
            setTimeout(() => {
                document.querySelector('.crawl').style.animation = 'crawl 100s linear forwards';

            // Redirect to profile page after crawl finishes
            setTimeout(() => {
                window.location.href = 'portfolio.html';
            }, 100000);
            }, 1500);

            // Phase 2 fades out shortly after Phase 3 appears
            setTimeout(() => {
                document.querySelector('.Phase2').style.opacity = '0';
            }, 1500);

        }, 15000);

    }, 1500);

}, 5000);