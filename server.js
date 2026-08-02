const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory data store for shipping requests
let clients = [
  { id: '1',  name: 'Stark, White and Abbott',           description: 'Cloned Optimal Architecture',                        status: 'in-progress' },
  { id: '2',  name: 'Wiza LLC',                          description: 'Exclusive Bandwidth-Monitored Implementation',        status: 'complete' },
  { id: '3',  name: 'Nolan LLC',                         description: 'Vision-Oriented 4Thgeneration Graphicaluserinterface',status: 'backlog' },
  { id: '4',  name: 'Thompson PLC',                      description: 'Streamlined Regional Knowledgeuser',                  status: 'in-progress' },
  { id: '5',  name: 'Walker-Williamson',                 description: 'Team-Oriented 6Thgeneration Matrix',                  status: 'in-progress' },
  { id: '6',  name: 'Boehm and Sons',                    description: 'Automated Systematic Paradigm',                       status: 'backlog' },
  { id: '7',  name: 'Runolfsson, Hegmann and Block',      description: 'Integrated Transitional Strategy',                    status: 'backlog' },
  { id: '8',  name: 'Schumm-Labadie',                    description: 'Operative Heuristic Challenge',                       status: 'backlog' },
  { id: '9',  name: 'Kohler Group',                      description: 'Re-Contextualized Multi-Tasking Attitude',            status: 'backlog' },
  { id: '10', name: 'Romaguera Inc',                     description: 'Managed Foreground Toolset',                          status: 'backlog' },
  { id: '11', name: 'Reilly-King',                         description: 'Future-Proofed Interactive Toolset',                  status: 'complete' },
  { id: '12', name: 'Emard, Champlin and Runolfsdottir', description: 'Devolved Needs-Based Capability',                     status: 'backlog' },
  { id: '13', name: 'Fritsch, Cronin and Wolff',         description: 'Open-Source 3Rdgeneration Website',                   status: 'complete' },
  { id: '14', name: 'Borer LLC',                         description: 'Profit-Focused Incremental Orchestration',            status: 'backlog' },
  { id: '15', name: 'Emmerich-Ankunding',                description: 'User-Centric Stable Extranet',                        status: 'in-progress' },
  { id: '16', name: 'Willms-Abbott',                     description: 'Progressive Bandwidth-Monitored Access',              status: 'in-progress' },
  { id: '17', name: 'Brekke PLC',                        description: 'Intuitive User-Facing Customerloyalty',               status: 'complete' },
  { id: '18', name: 'Bins, Toy and Klocko',              description: 'Integrated Assymetric Software',                      status: 'backlog' },
  { id: '19', name: 'Hodkiewicz-Hayes',                  description: 'Programmable Systematic Securedline',                 status: 'backlog' },
  { id: '20', name: 'Murphy, Lang and Ferry',              description: 'Organized Explicit Access',                           status: 'backlog' },
];

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date(), service: 'Shiptivitas Backend' });
});

// GET all shipping requests
app.get('/api/clients', (req, res) => {
  res.json(clients);
});

// POST a new shipping request
app.post('/api/clients', (req, res) => {
  const { name, description, status } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  const newClient = {
    id: String(Date.now()),
    name,
    description: description || 'New shipping task',
    status: status || 'backlog'
  };
  clients.push(newClient);
  res.status(201).json(newClient);
});

// PUT update a shipping request (status or position)
app.put('/api/clients/:id', (req, res) => {
  const { id } = req.params;
  const { status, name, description } = req.body;
  
  const clientIndex = clients.findIndex(c => c.id === id);
  if (clientIndex === -1) {
    return res.status(404).json({ error: 'Shipping request not found' });
  }

  if (status) clients[clientIndex].status = status;
  if (name) clients[clientIndex].name = name;
  if (description) clients[clientIndex].description = description;

  res.json(clients[clientIndex]);
});

// DELETE a shipping request
app.delete('/api/clients/:id', (req, res) => {
  const { id } = req.params;
  clients = clients.filter(c => c.id !== id);
  res.json({ message: 'Deleted successfully' });
});

// Serve React static build in production
if (process.env.NODE_ENV === 'production' || process.env.SERVE_BUILD === 'true') {
  app.use(express.static(path.join(__dirname, 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Shiptivitas full-stack server running on port ${PORT}`);
});
