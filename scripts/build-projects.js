import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function parseCSV(csvContent) {
  const lines = csvContent.split('\n').filter(line => line.trim() !== '');
  if (lines.length < 2) return [];
  
  // Parse headers
  const headerLine = lines[0];
  const headers = [];
  let currentHeader = '';
  let inQuotes = false;
  
  for (let i = 0; i < headerLine.length; i++) {
    const char = headerLine[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      headers.push(currentHeader.trim());
      currentHeader = '';
    } else {
      currentHeader += char;
    }
  }
  headers.push(currentHeader.trim());
  
  const projects = [];
  
  // Parse data rows
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const values = [];
    let current = '';
    let inQuotes = false;
    
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim());
    
    if (values.length >= headers.length) {
      const project = {};
      headers.forEach((header, index) => {
        project[header] = values[index] || '';
      });
      projects.push(project);
    }
  }
  
  return projects;
}

function transformProjects(projects) {
  return projects.map(project => ({
    id: project['Timestamp'] || Date.now().toString(),
    mentor: {
      name: project['Name'] || 'Anonymous',
      organization: project['Organization'] || '',
      bio: project['Please write a short bio about yourself (in third person). It will be visible to students when they browse project opportunities.'] || '',
      email: project['Email'] || ''
    },
    project: {
      title: project['Enter a title for your research project.'] || 'Untitled Project',
      description: project['Upload your research project here (1 pages). Mention the purpose of the research, the research gap you aim to address, and the methods you aim to explore. Include references to related work. '] || '',
      researchArea: project['What is the research area of the proposed project? (If multiple, separate with commas.)'] || '',
      prerequisites: project['Which competencies/experience/classes should students bring to work on your project (we are mainly focusing on undergraduate students)? These prerequisites will be displayed to students, and they will be asked to explain how they meet them.\nExamples:\n·      Highly proficient using Python. \n·      Trained or fine-tuned a transformer language model in PyTorch (toy models and following guides is fine).\n·      At least 50 hours working with LLMs.'] || '',
      hoursPerWeek: project['What are the minimum hours per week you would like students to spend on your project? Note that most students will work part-time on projects.'] || ''
    },
    questions: [
      project['Student Question 1:'] || '',
      project['Student Question 2:'] || '',
      project['Student Question 3:'] || ''
    ].filter(q => q.trim() !== '')
  }));
}

function buildProjects() {
  try {
    const csvPath = path.join(__dirname, '..', 'Mentor Registration.csv');
    const outputPath = path.join(__dirname, '..', 'src', 'data', 'projects.json');
    const publicOutputPath = path.join(__dirname, '..', 'public', 'data', 'projects.json');
    
    // Ensure the data directories exist
    const dataDir = path.dirname(outputPath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    const publicDataDir = path.dirname(publicOutputPath);
    if (!fs.existsSync(publicDataDir)) {
      fs.mkdirSync(publicDataDir, { recursive: true });
    }
    
    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    const projects = parseCSV(csvContent);
    const transformedProjects = transformProjects(projects);
    
    // Write the JSON file to both locations
    fs.writeFileSync(outputPath, JSON.stringify(transformedProjects, null, 2));
    fs.writeFileSync(publicOutputPath, JSON.stringify(transformedProjects, null, 2));
    
    console.log(`✅ Built ${transformedProjects.length} research projects from CSV`);
    console.log(`📁 Output: ${outputPath}`);
    console.log(`📁 Public: ${publicOutputPath}`);
    
    if (transformedProjects.length > 0) {
      console.log('📋 Sample project:', transformedProjects[0].project.title);
    }
    
  } catch (error) {
    console.error('❌ Error building projects:', error.message);
    process.exit(1);
  }
}

buildProjects(); 