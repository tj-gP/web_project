document.addEventListener('DOMContentLoaded', function() {
            // 오늘의 춘식이 랜덤 일러스트 기능 (예시)
            const chunsikImages = [
                { src: 'images/chunsik_random_1.png', caption: '"따뜻한 햇살 아래 낮잠 자는 춘식이의 평화로운 하루"' },
                { src: 'images/chunsik_random_2.png', caption: '"고구마와 함께하는 춘식이의 행복한 시간"' },
                { src: 'images/chunsik_random_3.png', caption: '"라이언과 함께 산책하는 춘식이"' }
            ];
            const randomChunsikImg = document.getElementById('random-chunsik-img');
            const randomChunsikCaption = document.getElementById('random-chunsik-caption');
            const ctaButton = document.querySelector('.cta-button');

            ctaButton.addEventListener('click', function(e) {
                e.preventDefault(); // 기본 링크 이동 방지
                const randomIndex = Math.floor(Math.random() * chunsikImages.length);
                randomChunsikImg.src = chunsikImages[randomIndex].src;
                randomChunsikCaption.textContent = chunsikImages[randomIndex].caption;
                document.getElementById('today-chunsik').scrollIntoView({ behavior: 'smooth' });
            });

            // 스크롤 시 fade-in 효과 (예시, 실제 구현은 더 복잡할 수 있음)
            const fadeElements = document.querySelectorAll('.fade-in');
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };

            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = 1;
                        entry.target.style.transform = 'translateY(0)';
                    } else {
                        entry.target.style.opacity = 0; /* 화면 밖으로 나가면 다시 숨김 */
                        entry.target.style.transform = 'translateY(20px)'; /* 원위치로 되돌림 */
                    }
                });
            }, observerOptions);

            fadeElements.forEach(el => {
                el.style.opacity = 0; /* 초기 상태는 투명하게 */
                el.style.transform = 'translateY(20px)'; /* 초기 상태는 아래로 내려가게 */
                el.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
                observer.observe(el);
            });

            // 댓글 남기기 기능 (예시)
            const submitCommentBtn = document.getElementById('submit-comment');
            const commentAuthorInput = document.getElementById('comment-author');
            const commentTextInput = document.getElementById('comment-text');
            const commentsList = document.getElementById('comments-list');

            submitCommentBtn.addEventListener('click', function() {
                const author = commentAuthorInput.value.trim();
                const comment = commentTextInput.value.trim();

                if (author && comment) {
                    const newCommentItem = document.createElement('div');
                    newCommentItem.classList.add('comment-item');
                    const now = new Date();
                    const dateString = `${now.getFullYear()}.${(now.getMonth() + 1).toString().padStart(2, '0')}.${now.getDate().toString().padStart(2, '0')}`;

                    newCommentItem.innerHTML = `
                        <p class="comment-author"><strong>${author}</strong> <small>${dateString}</small></p>
                        <p class="comment-content">${comment}</p>
                    `;
                    commentsList.prepend(newCommentItem); // 최신 댓글이 위에 오도록
                    commentAuthorInput.value = '';
                    commentTextInput.value = '';
                } else {
                    alert('이름과 내용을 모두 입력해주세요.');
                }
            });

            // 모바일 드로어 메뉴 (미구현, CSS/JS 추가 필요)
            // 갤러리 이미지 슬라이드/확대 (미구현, CSS/JS 추가 필요)
            // 인터랙티브 캐릭터 hover (미구현, CSS/JS 추가 필요)
        });