import React from 'react';
import * as image from '../static/images/welcome_image_main_2.png';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

export default (props) => {
    return(
        <main className='h-100'>
            <div className='container h-100'>
                <div className="row h-100 justify-items-center align-items-center">
                    <div className="col-12 mt-5 mt-lg-0 col-lg-6">
                        <div className='welcome-text-blok text-center text-lg-left'>
                            <h1 className='text-uppercase title_welcome mb-3'>
                                Хранилище для ваших электронных обучающих пособий
                            </h1>
                            <p className='mb-4'>
                                MELA - это место, где вам и вашим ЭОП будут рады.<br/>
                                Сервис работает быстро и надежно. <b>Попробуйте</b> и вы!
                            </p>
                            <div className='d-flex justify-content-center justify-content-lg-start'> 
                            { !props.isAuth ?
                                <React.Fragment>
                                    <Button className='mr-3' type='primary'>
                                        <Link to='signup'>Зарегистрироваться</Link>
                                    </Button>
                                    <Button>
                                        <Link to='login'>Войти</Link>
                                    </Button>
                                </React.Fragment>
                                :
                                <Button type='primary'>
                                    <Link to='profile'>Перейти в профиль</Link>
                                </Button>
                            }   
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-6 p-5">
                        <img className='img' src={image} alt='main_image'/>
                    </div>
                </div>
            </div>
        </main>
    )
}
