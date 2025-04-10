
document.addEventListener('DOMContentLoaded', () => {
    const prompt = document.getElementById('prompt');
    prompt.style.display = 'block';
    const result = document.getElementById('result');
    result.style.display = 'none';
    const errordiv = document.getElementById('errordiv');
    errordiv.style.display = 'none';
    const userbday = document.getElementById('userbday');
    const form = document.querySelector('form');
    const rainaudio = document.getElementById('rainaudio');
    const music = document.getElementById('music');

    rainaudio.play();
    music.play();

    form.addEventListener('submit', (event) => {
        event.preventDefault();
    });
    
    userbday.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            document.getElementById('send').click();
        }
    });

    document.getElementById('send').addEventListener('click', () => {
        fetch('./villagers.json')
        .then(response => response.json())
        .then(data => {
            const birthday = document.getElementById('userbday').value;
            const twin = data.find(villager => villager.birthday === birthday);
            
            if (twin) {

                document.getElementById('greetingmsg').style.display = 'none';
                errordiv.style.display = 'none';
                document.getElementById('prompt').style.display = 'none';
                document.getElementById('result').style.display = 'block';
                document.getElementById('villagerimg').src = twin.photoImage;
                document.getElementById('name').innerHTML = `${twin.name}  ｡ ˚ ✦`;
                let species = twin.species.toLowerCase();
                document.getElementById('species').innerHTML = `species: ${species}`;
                let personality = twin.personality.toLowerCase();
                document.getElementById('personality').innerHTML = `personality: ${personality}`;
                let hobby = twin.hobby.toLowerCase();
                document.getElementById('hobby').innerHTML = `hobby: ${hobby}`;
                let saying = twin.favoriteSaying.toLowerCase();
                document.getElementById('saying').innerHTML = `"${saying}"`;
                document.getElementById('returnimg').src = twin.iconImage;
            } else {
                document.getElementById('greetingmsg').style.display = 'none';
                document.getElementById('errordiv').style.display = 'block';

            }
        })
        .catch(error => {
            console.log('error fetching');
        });
    });

    document.getElementById('return').addEventListener('click', () => {
        result.style.display = 'none';
        prompt.style.display = 'block';
        errordiv.style.display = 'none';
    });
});