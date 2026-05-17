    document.querySelectorAll('.menu-btn').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.menu-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.content-block').forEach(block => block.classList.remove('active'));
        
        button.classList.add('active');

        const targetId = button.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
    });
});

const button = document.getElementById('fetchButton');
        const statusDiv = document.getElementById('status');
        const resultDiv = document.getElementById('result');
        
        async function fetchData() {
            button.disabled = true;
            button.textContent = 'Loading...';
            
            statusDiv.innerHTML = '<div class="loading">Request in progress...</div>';
            resultDiv.innerHTML = '';
            
            try {
                const resp = await fetch('https://nekos.best/api/v2/neko');
                
                
                if (!resp.ok) {
                    throw new Error(`HTTP error: ${resp.status} ${resp.statusText}`);
                }
                
                const data = await resp.json();

                const imageUrl = data.results[0].url;
                
                statusDiv.innerHTML = '<div class="success">Neko anime girl will be:></div>';
                resultDiv.innerHTML = `
            <strong>Here is an anime girl called Neko:></strong><br><br>
            <img src="${imageUrl}" alt="Neko image" style="max-width: 100%; max-height: 400px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.2); margin: 10px 0;">
            <br><br>
                      `;
                
            } catch (error) {
                console.error('Error:', error);
                statusDiv.innerHTML = `<div class="error">Error: ${error.message}</div>`;
                resultDiv.innerHTML = '<div class="error">There will be no Neko girl anime:(</div>';
                
            } finally {
                button.disabled = false;
                button.textContent = 'Request';
            }
        }
        
        button.addEventListener('click', fetchData);