'use client';

import { Montserrat } from 'next/font/google';
import variables from './sass/variables.module.sass';
import $ from 'jquery';
import { useState } from 'react';


export default function Home() {

  // useStates para para ir pro html

  const [ temp, setTemp ] = useState('');
  const [ cidade, setCidade ] = useState('');
  const [ icon, setIcon ] = useState('');
  const [ descri, setDescri ] = useState('');
  const [ main, setMain ] = useState('');
  const [ wind, setWind ] = useState('');
  

  // function para requisicao da api

  function searchInput(e, res){
    e.preventDefault();
      
    let currentValue = document.querySelector('input[type=text]').value;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${currentValue}&appid=8bf6c093aa6f906e5daa92d7824e6c76&units=metric`;

        fetch(url).then(response => response.json()).then(data=>{

              try{

        // desconstruindo o data
          const { weather, sys, main, name, clouds, wind } = data;

        // Definindo o useState

          setTemp(parseInt(main.temp))
          setCidade(name);
          setIcon(`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`);
          setDescri(weather[0])
          setMain(main)
          setWind(wind);
            

          // pegando a data e hora dinamicamente

          var date = new Date();

          var day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

          var hours = date.getHours().toString().padStart(2, '0');
          var minutes = date.getMinutes().toString().padStart(2, '0');
          var dayWeek = day[date.getDay()];
          var dayNumber = date.getDate().toString().padStart(2, '0');
          var monthNumber = (date.getMonth()+1).toString().padStart(2, '0');
          var yearNumber = date.getFullYear().toString().padStart(2, '0');

          document.querySelector('.time-font').innerHTML = `${hours}:${minutes} - ${dayWeek} ${dayNumber}/${monthNumber}/${yearNumber}`;

          // animação com jquery

          // lado esquerdo

          $('.left-bottom').css({'height': '80%', 'opacity': '0'});

          $('.left-bottom').animate({
                height: '75%',
                opacity: '1'
              })

          // lado direito

          $('.single-info').css({'margin-top': '30px', 'opacity': '0'});
          $('.single-info').animate({
            marginTop: '20px',
            opacity: '1'
          })

            }catch (error){
              alert('O valor inserido não existe. Por favor, tente novamente.');
          }  
          
        })
      
    }

    // animaçao da barra lateral mobile

    function animate(){
      $('.right-side').animate({
        width: 'toggle'     
      })
    }

  return (
    
    <main className='container flex'>
        <div className='left-side'>
            <header>
              <h2>Wheater</h2>
              <h2>See how is the weather just typing the name's city
              </h2> 
            </header>

            <div className='left-bottom flex'>
                <p className='celsius'>{temp}°</p>
    
                <div className='column'>
                   <p className='city-font'>{cidade}</p> <br/> <p className='time-font'>13:00 - Friday 09/06/2023</p>
                </div>

                <div className='column'>
                    <img className='icon' src={icon}></img> 
                      <br/> <p className='description'>{descri.main}</p>
                </div>
            </div>
        </div>

        <div className='right-side'>
              <header>
                <form onSubmit={(e) => searchInput(e)}>
                  <input type='text' placeholder="City's name..."></input>
                  <button>Search</button>
                </form>
              </header>

              <div className='details'>
                  <h2>More info about weather</h2>
                  <div className='single-info flex'>
                      <h2>Weather</h2>
                        <p>{descri.description}</p>
                  </div>

                  <div className='single-info flex'>
                      <h2>Feels like</h2>
                        <p>{main.feels_like}°</p>
                  </div>

                  <div className='single-info flex'>
                      <h2>Min temperature</h2>
                        <p>{main.temp_min}°</p>
                  </div>

                  <div className='single-info flex'>
                      <h2>Max temperature</h2>
                        <p>{main.temp_max}°</p>
                  </div>
                  
                  <div className='single-info flex'>
                      <h2>Humidity</h2>
                        <p>{main.humidity}%</p>
                  </div>

                  <div className='single-info flex'>
                      <h2>Wind speed</h2>
                        <p>{wind.speed} m/s</p>
                  </div>
                         
              </div>     
        </div>
          <div onClick={animate} className='mobile-button close'></div>
    </main>
  )
}
