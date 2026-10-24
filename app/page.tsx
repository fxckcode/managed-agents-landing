import { WaitlistForm } from "@/components/waitlist-form";

export default function Home() {
  return (
    <main id="contenido">
      <section id="inicio" className="hero">
        <div className="container hero-inner">
          <div>
            <h1>Dos minutos para ti, cuando más los necesitas</h1>
            <p className="lead">
              Pausa te recuerda tomar descansos breves durante tu jornada frente
              a la pantalla y te guía en cada uno, sin que tengas que planificarlos
              tú.
            </p>
            <a className="btn btn-cta" href="#lista-espera">
              Únete a la lista de espera
            </a>
          </div>
          <svg className="hero-art" aria-hidden="true" viewBox="0 0 240 240">
            <circle cx="120" cy="120" r="110" fill="#E4ECE6" />
            <circle cx="120" cy="120" r="72" fill="#4F7A63" />
            <rect x="96" y="84" width="16" height="72" rx="8" fill="#FBF8F3" />
            <rect x="128" y="84" width="16" height="72" rx="8" fill="#FBF8F3" />
          </svg>
        </div>
      </section>

      <section id="problema" className="section" aria-labelledby="problema-titulo">
        <div className="container narrow">
          <h2 id="problema-titulo">Las horas se encadenan sin darte cuenta</h2>
          <p>
            Si trabajas en remoto o en oficina frente al ordenador, es fácil pasar
            horas sin levantarte ni despegar la vista de la pantalla, y llegar
            agotado al final del día. Pausa existe para recordarte que pares un
            momento y acompañarte mientras lo haces.
          </p>
        </div>
      </section>

      <section id="beneficios" className="section alt" aria-labelledby="beneficios-titulo">
        <div className="container">
          <h2 id="beneficios-titulo">Lo que Pausa hace por ti</h2>
          <ul className="cards">
            <li className="card">
              <h3>Recordatorios a tu ritmo</h3>
              <p>Eliges cada cuánto quieres pausar.</p>
            </li>
            <li className="card">
              <h3>Descansos guiados de 2 minutos</h3>
              <p>Estiramientos, respiración o mirar a lo lejos.</p>
            </li>
            <li className="card">
              <h3>Sin distracciones</h3>
              <p>No hay feed, ni rachas, ni notificaciones extra.</p>
            </li>
          </ul>
        </div>
      </section>

      <section id="como-funciona" className="section" aria-labelledby="como-titulo">
        <div className="container">
          <h2 id="como-titulo">Cómo funciona</h2>
          <ol className="steps">
            <li>
              <h3>Elige tu horario</h3>
              <p>Indica tu horario y la frecuencia de tus pausas.</p>
            </li>
            <li>
              <h3>Recibe el aviso</h3>
              <p>Pausa te avisa cuando toca un descanso.</p>
            </li>
            <li>
              <h3>Haz tu pausa</h3>
              <p>Sigues una pausa guiada de 2 minutos y vuelves a lo tuyo.</p>
            </li>
          </ol>
        </div>
      </section>

      <section id="preguntas" className="section alt" aria-labelledby="preguntas-titulo">
        <div className="container narrow">
          <h2 id="preguntas-titulo">Preguntas frecuentes</h2>
          <details>
            <summary>¿Cuánto dura cada descanso?</summary>
            <p>Cada pausa guiada dura 2 minutos.</p>
          </details>
          <details>
            <summary>¿Puedo decidir cada cuánto me avisa?</summary>
            <p>Sí. Tú eliges tu horario y la frecuencia de los recordatorios.</p>
          </details>
          <details>
            <summary>¿Qué tipo de descansos propone?</summary>
            <p>
              Estiramientos, ejercicios de respiración o mirar a lo lejos para
              descansar la vista.
            </p>
          </details>
          <details>
            <summary>¿Pausa existe de verdad?</summary>
            <p>No. Pausa es un producto ficticio creado para esta página de demostración.</p>
          </details>
        </div>
      </section>

      <section id="lista-espera" className="section cta-section" aria-labelledby="lista-titulo">
        <div className="container narrow">
          <h2 id="lista-titulo">Únete a la lista de espera</h2>
          <p>
            Pausa es un producto ficticio y esta página es una demostración. La
            lista de espera es simulada: no se envía ni se guarda ningún dato.
          </p>
          <WaitlistForm />
        </div>
      </section>
    </main>
  );
}
