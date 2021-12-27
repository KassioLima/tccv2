import { animate, state, style, transition, trigger, keyframes, query, stagger, animateChild, group } from '@angular/animations';

const defaultStyle = {
    'animation': '3s linear infinite',
    "opacity": "0.3",
    'pointer-events': 'none'
};



export function animationLogin() {
    return trigger('animacao-painel', [
        state('criado', style({
            opacity: 1
        })),
        transition('void => criado', [
            style({ opacity: 0, transform: 'translate(300px, 0' }),
            //0 void -------X----------------X--Y--Y----Y 1.5s//
            animate('2.8s 0.5s ease-in-out', keyframes([
                style({ offset: 0.15, opacity: 1, transform: 'translateX(0)' }),
                style({ offset: 0.86, opacity: 1, transform: 'translateX(0)' }),
                style({ offset: 1, opacity: 1, transform: 'translateY(0)' })
            ])) //duração, delay e aceleração
        ])
    ])
}

export function loginError() {

    return trigger('login-error', [
        state('login', style({
            opacity: 1
        })),
        transition('stop => login', [
            //0 void -------X----------------X--Y--Y----Y 1.5s//
            animate('1.0s 0s ease-in-out', keyframes([
                style({ offset: 0.16, opacity: 1, transform: 'translateY(-10px)' }),
                style({ offset: 0.32, opacity: 1, transform: 'translateY(10px)' }),
                style({ offset: 0.48, opacity: 1, transform: 'translateY(-10px)' }),
                style({ offset: 0.54, opacity: 1, transform: 'translateY(10px)' }),
                style({ offset: 0.70, opacity: 1, transform: 'translateY(-10px)' }),
                style({ offset: 0.86, opacity: 1, transform: 'translateY(10px)' }),

                style({ offset: 1, opacity: 1, transform: 'translateY(0)' })
            ])) //duração, delay e aceleração
        ])
    ])
}
