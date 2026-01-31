// UI Management

class PortfolioUI {
  constructor() {
    this.currentSection = 'hero';
    this.initIntersectionObserver();
    this.initSmoothScroll();
    this.renderContent();
  }

  initIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '-50% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.currentSection = entry.target.id;
          window.currentSection = this.currentSection;
        }
      });
    }, options);

    // Observe all sections
    document.querySelectorAll('section[id]').forEach(section => {
      observer.observe(section);
    });
  }

  initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  renderContent() {
    this.renderSkills();
    this.renderExperience();
    this.renderProjects();
    this.renderEducation();
    this.renderAchievements();
    this.renderArt();
    this.renderContact();
    this.initArtLightbox();
  }

  initArtLightbox() {
    const lightbox = document.getElementById('art-lightbox');
    const lightboxImg = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxSubtitle = document.getElementById('lightbox-subtitle');
    const rotateBtn = document.getElementById('rotate-btn');
    const closeBtn = document.getElementById('lightbox-close');
    const overlay = document.querySelector('.lightbox-overlay');

    let currentRotation = 0;

    const openLightbox = (item) => {
      currentRotation = 0;
      lightboxImg.classList.remove('rotated-90', 'rotated-180', 'rotated-270');

      lightboxImg.src = item.image;
      lightboxTitle.textContent = item.title;
      lightboxSubtitle.textContent = item.category;

      currentRotation = item.rotation || 0;
      lightboxImg.style.transform = `rotate(${currentRotation}deg)`;

      // Handle special sizing for rotated images
      this.updateLightboxRotationClasses(currentRotation);

      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scroll
    };

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    };

    const rotateImage = () => {
      currentRotation = (currentRotation + 90) % 360;
      this.updateLightboxRotationClasses(currentRotation);
    };

    // Attach listeners to cards
    document.querySelectorAll('.art-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        const item = portfolioData.art.find(a => a.id === id);
        if (item) openLightbox(item);
      });
    });

    rotateBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      rotateImage();
    });

    closeBtn?.addEventListener('click', closeLightbox);
    overlay?.addEventListener('click', closeLightbox);

    // Keyboard support
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'r' && lightbox.classList.contains('active')) rotateImage();
    });
  }

  updateLightboxRotationClasses(rotation) {
    const lightboxImg = document.getElementById('lightbox-image');
    if (!lightboxImg) return;

    lightboxImg.style.transform = `rotate(${rotation}deg)`;
    lightboxImg.classList.remove('rotated-90', 'rotated-180', 'rotated-270');

    const normalizedRotation = ((rotation % 360) + 360) % 360;
    if (normalizedRotation === 90) lightboxImg.classList.add('rotated-90');
    if (normalizedRotation === 180) lightboxImg.classList.add('rotated-180');
    if (normalizedRotation === 270) lightboxImg.classList.add('rotated-270');
  }

  renderArt() {
    const artContent = document.querySelector('.art-content');
    if (!artContent || !portfolioData.art) return;

    artContent.innerHTML = `
      <div class="art-gallery-grid">
        ${portfolioData.art.map(item => `
          <div class="art-card ${item.rotation ? 'has-rotation' : ''}" data-id="${item.id}">
            <div class="art-image-container">
              <img src="${item.image}" alt="${item.title}" 
                   style="${item.rotation ? `transform: rotate(${item.rotation}deg);` : ''}"
                   loading="lazy" onerror="this.src='https://placehold.co/600x400/1a1b26/00ffa0?text=${item.title}'">
              <div class="art-overlay">
                <span class="art-category">${item.category}</span>
              </div>
            </div>
            <div class="art-info">
              <h4 class="art-title">${item.title}</h4>
              <p class="art-desc">${item.description}</p>
              <div class="art-meta">
                <span class="file-info">${item.size || '0 MB'}</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  renderEducation() {
    const educationContainer = document.getElementById('education-cli-content');

    if (educationContainer && portfolioData.education) {
      educationContainer.innerHTML = portfolioData.education.map((edu, index) => `
        <div class="cli-edu-block" style="animation-delay: ${index * 0.2}s">
          <div class="cli-edu-line">
            <span class="cli-edu-label">Institution</span>
            <span class="cli-edu-value"> : ${edu.institution}</span>
          </div>
          <div class="cli-edu-line">
            <span class="cli-edu-label">Program</span>
            <span class="cli-edu-value"> : ${edu.degree}</span>
          </div>
          <div class="cli-edu-line">
            <span class="cli-edu-label">Duration</span>
            <span class="cli-edu-value"> : ${edu.duration}</span>
          </div>
          ${edu.cgpa ? `
            <div class="cli-edu-line">
              <span class="cli-edu-label">CGPA</span>
              <span class="cli-edu-value"> : ${edu.cgpa}</span>
            </div>` : ''}
          ${edu.score ? `
            <div class="cli-edu-line">
              <span class="cli-edu-label">Score</span>
              <span class="cli-edu-value"> : ${edu.score}</span>
            </div>` : ''}
          <div class="cli-edu-line">
            <span class="cli-edu-label">Status</span>
            <span class="cli-edu-value ${edu.current ? 'status-running' : 'status-completed'}"> : ${edu.current ? 'running' : 'completed'}</span>
          </div>
        </div>

      `).join('');
    }
  }

  renderSkills() {
    const skillsGrid = document.querySelector('.skills-grid');

    if (skillsGrid) {
      skillsGrid.innerHTML = Object.entries(portfolioData.skills)
        .map(([category, skills]) => `
          <div class="skill-category">
            <h3 class="skill-category-title">[${category}]</h3>
            <ul class="skill-list">
              ${skills.map(skill => `
                <li class="skill-item">
                  <img src="${skill.logo}" alt="${skill.name}" class="terminal-icon" onerror="this.style.display='none'">
                  <span class="skill-name">${skill.name}</span>
                  <span class="skill-version">${skill.version}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        `).join('');
    }
  }

  renderProjects() {
    const treeContainer = document.getElementById('projects-tree-content');
    if (!treeContainer) return;

    let html = '<div class="tree-root">. (projects)</div>';

    html += portfolioData.projects.map((project, index) => {
      const isLast = index === portfolioData.projects.length - 1;
      const branch = isLast ? '└──' : '├──';

      return `
        <div class="tree-node">
          <div class="tree-node-header">
            <span class="tree-branch">${branch}</span>
            <a href="${project.github}" target="_blank" class="tree-role project-link">${project.name}</a>
          </div>
          <div class="tree-details">
            <div class="tree-desc">${project.description}</div>
            <div class="project-tech" style="margin: 8px 0;">
              ${project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
            </div>
          </div>
        </div>
      `;
    }).join('');

    treeContainer.innerHTML = html;
  }

  renderExperience() {
    const experienceGrid = document.getElementById('experience-grid-content');
    if (!experienceGrid) return;

    const allWork = [
      ...portfolioData.experience.map(e => ({ ...e, type: 'Experience' })),
      ...portfolioData.leadership.map(l => ({ ...l, type: 'Leadership' }))
    ];

    experienceGrid.innerHTML = allWork.map((work, index) => `
      <div class="project-card ${work.current ? 'project-highlight' : 'project-standard'}">
        <div class="project-header">
          <h3 class="project-title">${work.role}</h3>
          ${work.current ? `
            <span class="project-status project-status-active">active</span>
          ` : ''}
        </div>
        <div class="project-body">
          <div style="color: #00ffa0; margin-bottom: var(--space-sm); font-family: var(--font-mono);">@ ${work.organization}</div>
          <div style="color: var(--text-dim); font-size: 0.9rem; margin-bottom: var(--space-md);">${work.duration}</div>
          <p class="project-description">${work.description}</p>
          ${work.responsibilities ? `
            <div class="project-features">
              <ul>
                ${work.responsibilities.map(task => `<li>${task}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
          <div class="tech-tag" style="margin-top: var(--space-md); display: inline-block;">${work.type}</div>
        </div>
      </div>
    `).join('');
  }

  renderAchievements() {
    const achievementsGrid = document.querySelector('.achievements-grid');

    if (achievementsGrid && portfolioData.achievements) {
      achievementsGrid.innerHTML = portfolioData.achievements.map(achievement => `
        <div class="log-entry">
          <div class="log-header">
            <span class="log-date">[${achievement.date}]</span>
            <span class="log-icon">🏆</span>
            <span class="log-title">${achievement.title}</span>
          </div>
          <div class="log-body">
            <p class="log-description">${achievement.description}</p>
          </div>
        </div>
      `).join('');
    }
  }

  renderContact() {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
      contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        formStatus.textContent = 'Status: Sending...';
        formStatus.style.color = '#f1c40f'; // Yellow

        try {
          const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
              'Accept': 'application/json'
            }
          });

          if (response.ok) {
            formStatus.textContent = 'Status: Message sent successfully!';
            formStatus.style.color = '#4ade80'; // Green
            contactForm.reset();
          } else {
            const data = await response.json();
            formStatus.textContent = `Status: Error (Check Formspree ID)`;
            formStatus.style.color = '#ff5f56'; // Red
          }
        } catch (error) {
          formStatus.textContent = 'Status: Network error. Try again.';
          formStatus.style.color = '#ff5f56'; // Red
        }

        setTimeout(() => {
          if (formStatus.textContent.includes('successfully')) {
            formStatus.textContent = 'Status: Ready to send';
            formStatus.style.color = '';
          }
        }, 5000);
      });
    }
  }

  formatCategoryName(category) {
    const names = {
      languages: 'Programming Languages',
      frameworks: 'Frameworks & Libraries',
      databases: 'Databases',
      tools: 'Developer Tools',
      systems: 'Operating Systems',
      dataViz: 'Data & Visualization'
    };
    return names[category] || this.capitalize(category);
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

// Initialize UI when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioUI();
});
