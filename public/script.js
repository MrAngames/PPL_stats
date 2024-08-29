const ctx = document.getElementById('34Chart5').getContext('2d');
let chart = null;

function fetchData() {
    fetch('https://ppl-stats-back.onrender.com/data')
        .then(response => response.json())
        .then(data => {
            if (chart) {
                chart.data.labels = data.time;
                chart.data.datasets[0].data = data.online;
                chart.update();
            } else {
                createGraph(data.time, data.online);
            }
        })
        .catch(error => console.error('Ошибка при получении данных:', error));
}

function createGraph(time, online) {
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: time,
            datasets: [{
                label: 'Онлайн игроков',
                data: online,
                borderColor: 'white',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            plugins: {
                legend: {
                    labels: {
                        font: {
                            size: 20,
                        },
                        color: 'white'
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Время'
                    },
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 99999
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Количество игроков'
                    },
                    beginAtZero: true
                }
            }
        }
    });
}

// Обновляем данные каждые 15 минут
setInterval(fetchData, 15 * 60 * 1000);

// Первый вызов, чтобы сразу отобразить график
fetchData();
