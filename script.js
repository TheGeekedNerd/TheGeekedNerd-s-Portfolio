setTimeout(() => {
    // Phase 1 fades out
    document.querySelector('.Phase1').style.opacity = '0';

    setTimeout(() => {
        // Phase 2 fades in and scales down
        document.querySelector('.Phase2').style.opacity = '1';
        document.querySelector('#Phase2Title').style.animation = 'scaleDown 3s ease-in forwards';

        setTimeout(() => {
            // Phase 2 fades out
            document.querySelector('.Phase2').style.opacity = '0';

            setTimeout(() => {
                // Phase 3 fades in
                document.querySelector('.Phase3').style.opacity = '1';

                // Start crawl after fade-in completes
                setTimeout(() => {
                    document.querySelector('.crawl').style.animation = 'crawl 20s linear forwards';
                }, 1500);

            }, 1500);

        }, 3000); // wait for scaleDown to finish

    }, 1500);

}, 5000);