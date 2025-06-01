const express = require('express');
const router = express.Router();
const fs = require('fs');
const Joi = require('joi');
const { getMockImagePath } = require('../config/paths');

router.get('/datasets', (req, res) => {
  res.json(['Classification', 'Preprocessing', 'Search']);
});

router.get('/images/:dataset_type', (req, res) => {
  res.json([
    {
      image_name: 'image.png',
      image_path: getMockImagePath('image.png'),
      modality: 'SAR'
    },
    {
      image_name: 'image.png',
      image_path: getMockImagePath('image.png'),
      modality: 'RGB'
    },
    {
      image_name: 'image.png',
      image_path: getMockImagePath('image.png'),
      modality: 'IR'
    }
  ]);
});

router.get('/image', (req, res) => {
  const image_path = req.query.image_path;
  try {
    const image = fs.readFileSync(image_path);
    res.contentType('image/png');
    res.send(image);
  } catch (err) {
    res.status(404).json({
      success: false,
      error: 'Image not found',
      message: err.message
    });
  }
});

router.get('/get_yaml_files', (req, res) => {
  res.json({
    algorithms: [
      {
        name: 'ppo',
        task: 'preprocessing',
        'training config': [
          '/home/lab1523/Project/CVRL/CV-RL-PR/RL/config/ppo_prepro_train.yaml'
        ],
        'validation config': [
          '/home/lab1523/Project/CVRL/CV-RL-PR/RL/config/ppo_prepro_test.yaml'
        ]
      },
      {
        name: 'dqn',
        task: 'search',
        'training config': [
          '/home/lab1523/Project/CVRL/CV-RL-PR/RL/config/dqn_search_train.yaml'
        ],
        'validation config': [
          '/home/lab1523/Project/CVRL/CV-RL-PR/RL/config/dqn_search_test.yaml'
        ]
      },
      {
        name: 'c51',
        task: 'classification',
        'training config': [
          '/home/lab1523/Project/CVRL/CV-RL-PR/RL/config/c51_cl_train.yaml'
        ],
        'validation config': [
          '/home/lab1523/Project/CVRL/CV-RL-PR/RL/config/c51_cl_test.yaml'
        ]
      },
      {
        name: 'dqn',
        task: 'preprocessing',
        'training config': [
          '/home/lab1523/Project/CVRL/CV-RL-PR/RL/config/dqn_prepro_train.yaml'
        ],
        'validation config': [
          '/home/lab1523/Project/CVRL/CV-RL-PR/RL/config/dqn_prepro_test.yaml'
        ]
      },
      {
        name: 'ppo',
        task: 'classification',
        'training config': [
          '/home/lab1523/Project/CVRL/CV-RL-PR/RL/config/ppo_cl_train.yaml'
        ],
        'validation config': [
          '/home/lab1523/Project/CVRL/CV-RL-PR/RL/config/ppo_cl_test.yaml'
        ]
      },
      {
        name: 'dqn',
        task: 'classification',
        'training config': [
          '/home/lab1523/Project/CVRL/CV-RL-PR/RL/config/dqn_cl_train.yaml'
        ],
        'validation config': [
          '/home/lab1523/Project/CVRL/CV-RL-PR/RL/config/dqn_cl_test.yaml'
        ]
      }
    ]
  });
});

router.get('/get_config', (req, res) => {
  const config_path = req.query.config_path;
  res.json({
    config: {
      cuda: true,
      torch_deterministic: true,
      capture_video: false,
      use_docker: true,
      test_mode: true,
      track: false,
      wandb_project_name: 'CV_RL_PR_v1.0',
      wandb_entity: 'None',
      exp_name: 'dqn',
      env_id: 'classify',
      modal: 'RGB',
      seed: 3407,
      total_timesteps: 2000,
      learning_starts: 100,
      target_network_frequency: 100,
      train_frequency: 50,
      save_checkpoints_freq: 1000,
      learning_rate: '1e-4',
      batch_size: 128,
      eval_episodes: 3,
      num_layers: 18,
      buffer_size: 5000,
      gamma: 0.99,
      tau: 1,
      start_e: 1,
      end_e: 0.05,
      exploration_fraction: 0.5
    },
    config_path: config_path
  });
});

router.get('/rl_train', (req, res) => {
  const schema = Joi.object({
    algorithm_name: Joi.string().required(),
    validation_config: Joi.string().required(),
    modal: Joi.string().required()
  });

  const { error, value } = schema.validate(req.query);
  if (error) {
    return res.status(400).json({
      success: false,
      error: 'Invalid input parameters',
      message: error.message,
      details: error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }))
    });
  }

  const { algorithm_name, validation_config, modal } = value;

  // Set SSE headers
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Cache-Control'
  });

  // Send initial connection confirmation
  res.write(
    `data: {"message": "Training started", "algorithm": "${algorithm_name}", "config": "${validation_config}", "modal": "${modal}"}\n\n`
  );

  let globalStep = 0;
  let isTraining = true;

  // Simulate training data stream
  const trainingInterval = setInterval(() => {
    if (!isTraining || res.finished) {
      clearInterval(trainingInterval);
      return;
    }

    globalStep++;

    // Generate random training metrics
    const episodicState = Math.floor(Math.random() * 10);
    const episodicAction = Math.floor(Math.random() * 4);
    const episodicReturn = (Math.random() * 2 - 1).toFixed(3); // Random value between -1 and 1

    // Send training data in specified format
    const trainingData = `global_step=${globalStep}, episodeic_state=${episodicState}, episodic_action=${episodicAction}, episodic_return=${episodicReturn}`;
    res.write(`data: ${trainingData}\n\n`);

    // Simulate training completion after 20 steps
    if (globalStep >= 10) {
      // Send end event with specified data
      res.write(`event: end\n`);
      res.write(`data: Stream finished\n\n`);
      isTraining = false;
      clearInterval(trainingInterval);
      res.end();
    }
  }, 1000); // Send data every second

  // Handle client disconnect
  req.on('close', () => {
    isTraining = false;
    clearInterval(trainingInterval);
    console.log(`Training stream closed for ${algorithm_name}`);
  });

  req.on('aborted', () => {
    isTraining = false;
    clearInterval(trainingInterval);
    console.log(`Training stream aborted for ${algorithm_name}`);
  });
});

module.exports = router;
