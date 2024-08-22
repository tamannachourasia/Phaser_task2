import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import Phaser from 'phaser';

const Game = forwardRef(({ readOnly }, ref) => {
  const ballRef = useRef(null);

  useEffect(() => {
    const config = {
      type: Phaser.CANVAS,
      width: 600,
      height: 400,
      parent: 'phaser-game',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false,
        },
      },
      scene: {
        preload: preload,
        create: create,
      },
    };

    const game = new Phaser.Game(config);

    function preload() {
      this.load.image('sky', 'assets/background.jpg');
      this.load.image('ball', 'assets/ball.png');
    }

    function create() {
      this.add.image(-1500, 1800, 'sky');
      const ball = this.physics.add.image(300, 200, 'ball')
        .setCollideWorldBounds(true)
        .setBounce(1, 1);
      ball.setDisplaySize(50, 50);
      ball.setVelocity(300, 300); // Set initial velocity

      ballRef.current = ball;
    }

    return () => {
      game.destroy(true);
    };
  }, []);

  useImperativeHandle(ref, () => ({
    moveBall(direction) {
      if (readOnly || !ballRef.current) return;

      switch (direction) {
        case 'up1':
          ballRef.current.setVelocity(-500, -500);
          break;
        case 'up2':
          ballRef.current.setVelocity(500, -500);
          break;
        case 'down1':
          ballRef.current.setVelocity(-500, 500);
          break;
        case 'down2':
          ballRef.current.setVelocity(500, 500);
          break;
        case 'left1':
          ballRef.current.setVelocity(-500, -500);
          break;
        case 'left2':
          ballRef.current.setVelocity(-500, 500);
          break;
        case 'right1':
          ballRef.current.setVelocity(500, -500);
          break;
        case 'right2':
          ballRef.current.setVelocity(500, 500);
          break;
        default:
          break;
      }
    }
  }));

  return <div id="phaser-game"></div>;
});

export default Game;
