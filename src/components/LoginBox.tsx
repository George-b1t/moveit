import styles from '../styles/components/LoginBox.module.css';

export function LoginBox() {
  return (
    <div className={styles.container}>
      <img src={'/logo-full-login.svg'} alt='Logo Full'/>
      <div className={styles.content}>
        <div className={styles.welcome}>
          <h1>Bem Vindo</h1>
          <div className={styles.welcomeWithGithub}>
            <img src={'/icons/github.svg'} alt='GitHub'/>
            <p>Faça login com seu Github para começar</p>
          </div>
        </div>
        <div className={styles.sendLogin}>
          <input placeholder="Digite seu username"/>
          <button>
            <img src={'/icons/right-arrow.svg'} alt="Right Arrow"/>
          </button>
        </div>
      </div>
    </div>
  );
}