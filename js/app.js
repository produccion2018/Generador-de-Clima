// Obtener el clima de la ciudad escrita por el usuario
function getWeather() {
    const city = document.getElementById('city').value.trim();
    if (!city) {
      Swal.fire({
        icon: 'error',
        title: '¡Oops!',
        text: 'Por favor, ingresa una ciudad.',
      });
      return;
    }
  
    const apiKey = '3b5a1ef903632cf4214736efd5faad80'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const weatherInfo = document.getElementById('weather-info');
        weatherInfo.innerHTML = `
          <h2>Clima en ${data.name}, ${data.sys.country}</h2>
          <p><strong>Temperatura:</strong> ${data.main.temp}°C</p>
          <p><strong>Condición:</strong> ${data.weather[0].description}</p>
          <p><strong>Humedad:</strong> ${data.main.humidity}%</p>
          <p><strong>Viento:</strong> ${data.wind.speed} m/s</p>
        `;
      })
      .catch(error => {
        console.log('Error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo obtener el clima de esa ciudad. Intenta con otro nombre.',
        });
      });
  }
  
  // Obtener el clima de la ubicación actual
  function getWeatherFromLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const apiKey = '3b5a1ef903632cf4214736efd5faad80'; // mi clave api
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  
        fetch(url)
          .then(response => response.json())
          .then(data => {
            const weatherInfo = document.getElementById('weather-info');
            weatherInfo.innerHTML = `
              <h2>Clima en ${data.name}, ${data.sys.country}</h2>
              <p><strong>Temperatura:</strong> ${data.main.temp}°C</p>
              <p><strong>Condición:</strong> ${data.weather[0].description}</p>
              <p><strong>Humedad:</strong> ${data.main.humidity}%</p>
              <p><strong>Viento:</strong> ${data.wind.speed} m/s</p>
            `;
          })
          .catch(error => {
            console.log('Error:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo obtener el clima de tu ubicación. Intenta nuevamente.',
            });
          });
      }, function(error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo obtener tu ubicación. Por favor, habilita la geolocalización.',
        });
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Tu navegador no soporta la geolocalización.',
      });
    }
  }
  
  // Limpiar la información del clima
  function clearWeather() {
    document.getElementById('city').value = ''; // Limpiar el campo de texto
    document.getElementById('weather-info').innerHTML = ''; // Limpiar la sección de clima
  
    Swal.fire({
      icon: 'success',
      title: '¡Limpiado!',
      text: 'La información del clima ha sido eliminada.',
    });
  }
  