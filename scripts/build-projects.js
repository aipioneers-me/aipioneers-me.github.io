import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function parseCSV(csvContent) {
  // Don't split on newlines first - parse the entire content as one string
  const headers = [];
  const projects = [];
  
  let currentField = '';
  let inQuotes = false;
  let currentRow = [];
  let currentRowIndex = 0;
  let isHeaderRow = true;
  
  for (let i = 0; i < csvContent.length; i++) {
    const char = csvContent[i];
    const nextChar = csvContent[i + 1];
    
    if (char === '"') {
      if (nextChar === '"') {
        // Escaped quote
        currentField += '"';
        i++; // Skip next quote
      } else {
        // Toggle quote state
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // End of field
      currentRow.push(currentField.trim());
      currentField = '';
    } else if (char === '\n' && !inQuotes) {
      // End of row
      currentRow.push(currentField.trim());
      currentField = '';
      
      if (currentRow.length > 0 && currentRow.some(field => field.trim() !== '')) {
        if (isHeaderRow) {
          headers.push(...currentRow);
          console.log('📋 Parsed headers:', headers);
          isHeaderRow = false;
        } else if (currentRow.length >= headers.length) {
          const project = {};
          headers.forEach((header, index) => {
            project[header] = currentRow[index] || '';
          });
          projects.push(project);
        } else {
          console.log(`⚠️  Row ${currentRowIndex + 1} has ${currentRow.length} values but ${headers.length} headers`);
        }
      }
      
      currentRow = [];
      currentRowIndex++;
    } else {
      currentField += char;
    }
  }
  
  // Handle the last field/row
  if (currentField.trim() !== '') {
    currentRow.push(currentField.trim());
  }
  if (currentRow.length > 0 && !isHeaderRow && currentRow.some(field => field.trim() !== '')) {
    if (currentRow.length >= headers.length) {
      const project = {};
      headers.forEach((header, index) => {
        project[header] = currentRow[index] || '';
      });
      projects.push(project);
    }
  }
  
  return projects;
}

function transformProjects(projects) {
  const getByContains = (obj, substrings) => {
    const keys = Object.keys(obj);
    const key = keys.find(k => substrings.every(s => k.includes(s)));
    return key ? obj[key] : '';
  };

  return projects.map(project => {
    // Log the first project to debug column mapping
    if (projects.indexOf(project) === 0) {
      console.log('🔍 First project raw data:', project);
    }

    const id = project['Timestamp'] || Date.now().toString();
    const name = project['Name'] || '';
    const organization = project['Organization'] || '';
    const email = project['Email'] || '';
    const bio = getByContains(project, ['Please write a short bio about yourself']);
    const photo = getByContains(project, ['Please upload a photo of yourself']);

    const title = getByContains(project, ['Enter a title for your research project']) || 'Untitled Project';
    const description = getByContains(project, ['Upload your research project here']);
    const researchArea = getByContains(project, ['What is the research area of the proposed project']);
    const prerequisites = getByContains(project, ['Which competencies/experience/classes should students bring']);
    const hoursPerWeek = getByContains(project, ['What are the minimum hours per week you would like students']);

    const q1 = getByContains(project, ['Student Question 1']);
    const q2 = getByContains(project, ['Student Question 2']);
    const q3 = getByContains(project, ['Student Question 3']);
    const questions = [q1, q2, q3].filter(q => typeof q === 'string' && q.trim() !== '');

    return {
      id,
      mentor: {
        name: name || 'Anonymous',
        organization,
        bio,
        email,
        photo
      },
      project: {
        title,
        description,
        researchArea,
        prerequisites,
        hoursPerWeek
      },
      questions
    };
  });
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
