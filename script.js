// (1)
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("gameCanvas");
  const context = canvas.getContext("2d");
  const box = 32;
  let snake = [{ x: 8 * box, y: 8 * box }];
  let direction = null;
  let food = {
    x: Math.floor(Math.random() * 16) * box,
    y: Math.floor(Math.random() * 16) * box
  };

  // (2) Função para criar o background do jogo
  function createBG() {
    context.fillStyle = "#ddd";
    context.fillRect(0, 0, 16 * box, 16 * box);
  }

  // (3) Função para criar a cobrinha
  function createSnake() {
    for (let i = 0; i < snake.length; i++) {
      context.fillStyle = i === 0 ? "#00f" : "#0f0";
      context.fillRect(snake[i].x, snake[i].y, box, box);
    }
  }

  // (4) Função para criar a comida
  function createFood() {
    context.fillStyle = "#f00";
    context.fillRect(food.x, food.y, box, box);
  }

  // (5) Função para atualizar a direção da cobrinha
  function update(event) {
    switch (event.key) {
      case "ArrowLeft":
        if (direction !== "right") direction = "left";
        break;
      case "ArrowUp":
        if (direction !== "down") direction = "up";
        break;
      case "ArrowRight":
        if (direction !== "left") direction = "right";
        break;
      case "ArrowDown":
        if (direction !== "up") direction = "down";
        break;
    }
  }

  // (6) Função para iniciar o jogo
  function startGame() {
    // (7) Atualiza a posição da cobrinha
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // (7) Move a cobra na direção correta
    if (direction === "right") snakeX += box;
    if (direction === "left") snakeX -= box;
    if (direction === "up") snakeY -= box;
    if (direction === "down") snakeY += box;

    // (6) Verifica se a cobra colidiu com as paredes
    if (
      snakeX < 0 || snakeX >= 16 * box || 
      snakeY < 0 || snakeY >= 16 * box
    ) {
      // (6) Se colidir com as paredes, encerra o jogo
      clearInterval(game);
      alert("Game Over! Você colidiu com as paredes.");
      return;
    }

    // (6) Verifica se a cobra colidiu com seu próprio corpo
    for (let i = 1; i < snake.length; i++) {
      if (snakeX === snake[i].x && snakeY === snake[i].y) {
        (6) // Se colidir com o próprio corpo, encerra o jogo
        clearInterval(game);
        alert("Game Over! Você colidiu com o próprio corpo.");
        return;
      }
    }

    // (8) Verifica se a cobrinha comeu a comida
    if (snakeX === food.x && snakeY === food.y) {
      // (8) Gera nova posição para a comida
      food = {
        x: Math.floor(Math.random() * 16) * box,
        y: Math.floor(Math.random() * 16) * box
      };
    } else {
      // (8) Remove o último elemento da cobra
      snake.pop();
    }

    // (8) Cria uma nova cabeça para a cobra
    const newHead = {
      x: snakeX,
      y: snakeY
    };

    // (8) Adiciona a nova cabeça no início da cobra
    snake.unshift(newHead);

    // Limpa o canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Renderiza o jogo
    createBG();
    createSnake();
    createFood();
  }

  // (9) Event listener para o evento de teclado
  document.addEventListener("keydown", update);

  // (9) Inicia o jogo com um intervalo de 100ms
  const game = setInterval(startGame, 100);

  // Foca o canvas para garantir que as teclas funcionem imediatamente
  canvas.focus();
});