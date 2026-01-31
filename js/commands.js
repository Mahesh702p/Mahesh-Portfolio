// Terminal Command Registry

const commands = {
    help: {
        description: "List all available commands",
        execute: () => {
            return `
<span class="terminal-success">Available Commands:</span>

<div class="terminal-help-table">
  <div class="terminal-help-row">
    <span class="terminal-help-command">help</span>
    <span class="terminal-help-desc">Show this help message</span>
  </div>
  <div class="terminal-help-row">
    <span class="terminal-help-command">about / whoami</span>
    <span class="terminal-help-desc">Display profile information</span>
  </div>
  <div class="terminal-help-row">
    <span class="terminal-help-command">ls [section]</span>
    <span class="terminal-help-desc">List sections or content</span>
  </div>
  <div class="terminal-help-row">
    <span class="terminal-help-command">cd &lt;section&gt;</span>
    <span class="terminal-help-desc">Navigate to a section</span>
  </div>
  <div class="terminal-help-row">
    <span class="terminal-help-command">cat &lt;section&gt;</span>
    <span class="terminal-help-desc">Display section content</span>
  </div>
  <div class="terminal-help-row">
    <span class="terminal-help-command">skills / packages</span>
    <span class="terminal-help-desc">List installed skills</span>
  </div>
  <div class="terminal-help-row">
    <span class="terminal-help-command">education</span>
    <span class="terminal-help-desc">Show education details</span>
  </div>
  <div class="terminal-help-row">
    <span class="terminal-help-command">experience</span>
    <span class="terminal-help-desc">Show work experience</span>
  </div>
  <div class="terminal-help-row">
    <span class="terminal-help-command">achievements</span>
    <span class="terminal-help-desc">Show achievements</span>
  </div>
  <div class="terminal-help-row">
    <span class="terminal-help-command">projects</span>
    <span class="terminal-help-desc">List all projects</span>
  </div>
  <div class="terminal-help-row">
    <span class="terminal-help-command">gallery / view</span>
    <span class="terminal-help-desc">Open art gallery</span>
  </div>
  <div class="terminal-help-row">
    <span class="terminal-help-command">contact</span>
    <span class="terminal-help-desc">Show contact information</span>
  </div>
  <div class="terminal-help-row">
    <span class="terminal-help-command">download resume</span>
    <span class="terminal-help-desc">Download resume PDF</span>
  </div>
  <div class="terminal-help-row">
    <span class="terminal-help-command">pwd</span>
    <span class="terminal-help-desc">Show current section</span>
  </div>
  <div class="terminal-help-row">
    <span class="terminal-help-command">clear</span>
    <span class="terminal-help-desc">Clear terminal output</span>
  </div>
  <div class="terminal-help-row">
    <span class="terminal-help-command">neofetch</span>
    <span class="terminal-help-desc">Display system information</span>
  </div>
  <div class="terminal-help-row">
    <span class="terminal-help-command">oneko</span>
    <span class="terminal-help-desc">Toggle the oneko cat</span>
  </div>
  <div class="terminal-help-row">
    <span class="terminal-help-command">exit</span>
    <span class="terminal-help-desc">Exit and reboot</span>
  </div>
</div>
      `.trim();
        }
    },

    about: {
        description: "Display profile information",
        execute: () => {
            const { profile } = portfolioData;
            return `
<span class="terminal-success">${profile.name}</span>
<span class="terminal-output-text">${profile.title}</span>

${profile.bio}

<span class="terminal-prompt-symbol">Location:</span> ${profile.location}
<span class="terminal-prompt-symbol">GitHub:</span> <a href="${profile.github}" class="terminal-link" target="_blank">${profile.github}</a>
      `.trim();
        }
    },

    whoami: {
        description: "Alias for about",
        execute: () => commands.about.execute()
    },

    ls: {
        description: "List sections or content",
        execute: (args) => {
            if (!args || args.length === 0) {
                const sections = portfolioData.sections.map(s => s.name).join('  ');
                return `<span class="terminal-output-text">${sections}</span>`;
            }

            const target = args[0].toLowerCase();
            if (target === 'projects') {
                const projectList = portfolioData.projects
                    .map(p => `  ${p.name}`)
                    .join('\n');
                return `<span class="terminal-output-text">${projectList}</span>`;
            } else if (target === 'art' || target === 'gallery') {
                const artList = portfolioData.art
                    .map(a => `  ${a.id}.jpg  (${a.title})`)
                    .join('\n');
                return `<span class="terminal-output-text">${artList}</span>`;
            }

            return `<span class="terminal-error">ls: cannot access '${target}': No such section</span>`;
        }
    },

    cd: {
        description: "Navigate to a section",
        execute: (args) => {
            if (!args || args.length === 0) {
                return `<span class="terminal-error">cd: missing operand</span>`;
            }

            const target = args[0].toLowerCase();
            const section = portfolioData.sections.find(s =>
                s.name.toLowerCase() === target || s.id === target
            );

            if (section) {
                // Scroll to section
                const element = document.getElementById(section.id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    window.currentSection = section.id;
                    return `<span class="terminal-success">Navigated to ${section.name}</span>`;
                }
            }

            return `<span class="terminal-error">cd: ${target}: No such section</span>`;
        }
    },

    cat: {
        description: "Display section content",
        execute: (args) => {
            if (!args || args.length === 0) {
                return `<span class="terminal-error">cat: missing operand</span>`;
            }

            const target = args[0].toLowerCase();

            if (target === 'about') {
                return commands.about.execute();
            } else if (target === 'skills') {
                return commands.skills.execute();
            } else if (target === 'education') {
                return commands.education.execute();
            } else if (target === 'experience') {
                return commands.experience.execute();
            } else if (target === 'achievements') {
                return commands.achievements.execute();
            } else if (target === 'projects') {
                return commands.projects.execute();
            } else if (target === 'art' || target === 'gallery') {
                return commands.gallery.execute();
            } else if (target === 'contact') {
                return commands.contact.execute();
            }

            return `<span class="terminal-error">cat: ${target}: No such file or directory</span>`;
        }
    },

    skills: {
        description: "List installed skills",
        execute: () => {
            const formatSkillsOutput = (skillsData) => {
                let output = '<div class="cmd-response">';
                output += '<div class="cmd-line text-green">Installed Packages:</div><br>';

                for (const [category, skills] of Object.entries(skillsData)) {
                    if (skills.length > 0) {
                        output += `<div style="color: var(--text-dim); margin-bottom: 8px; margin-top: 16px;">[${category}]</div>`;
                        output += '<div class="cmd-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 8px; margin-bottom: 16px;">';

                        skills.forEach(skill => {
                            output += `
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <img src="${skill.logo}" alt="${skill.name}" style="width: 14px; height: 14px; object-fit: contain; vertical-align: middle;">
                                <span style="color: var(--text-primary); min-width: 100px;">${skill.name}</span>
                                <span style="color: var(--text-dim);">${skill.version}</span>
                            </div>
                        `;
                        });

                        output += '</div>';
                    }
                }

                output += '</div>';
                return output;
            };
            return formatSkillsOutput(portfolioData.skills);
        }
    },

    packages: {
        description: "Alias for skills",
        execute: () => commands.skills.execute()
    },

    education: {
        description: "Show education details",
        execute: () => {
            let output = '<span class="terminal-success">Education:</span>\n\n';
            portfolioData.education.forEach(edu => {
                output += `<span class="terminal-warning">${edu.institution}</span> (${edu.duration})\n`;
                output += `   ${edu.degree}\n`;
                if (edu.score) output += `   Score: ${edu.score}\n`;
                if (edu.cgpa) output += `   CGPA: ${edu.cgpa}\n`;
                output += '\n';
            });
            return output.trim();
        }
    },

    experience: {
        description: "Show work experience",
        execute: () => {
            let output = '<span class="terminal-success">Experience & Leadership:</span>\n\n';
            portfolioData.experience.forEach(exp => {
                output += `<span class="terminal-warning">${exp.role}</span> @ ${exp.organization}\n`;
                output += `   ${exp.duration}\n`;
                output += `   ${exp.description}\n\n`;
            });
            output += '<span class="terminal-success">Leadership:</span>\n\n';
            portfolioData.leadership.forEach(lead => {
                output += `<span class="terminal-warning">${lead.role}</span> @ ${lead.organization}\n`;
                output += `   ${lead.duration}\n`;
                output += `   ${lead.description}\n\n`;
            });
            return output.trim();
        }
    },

    achievements: {
        description: "Show achievements",
        execute: () => {
            let output = '<span class="terminal-success">Achievements:</span>\n\n';
            portfolioData.achievements.forEach(ach => {
                output += `<span class="terminal-warning">🏆 ${ach.title}</span> (${ach.date})\n`;
                output += `   ${ach.description}\n\n`;
            });
            return output.trim();
        }
    },

    projects: {
        description: "List all projects",
        execute: () => {
            let output = '<span class="terminal-success">Projects:</span>\n\n';

            portfolioData.projects.forEach((project, idx) => {
                output += `<span class="terminal-warning">${idx + 1}. ${project.name}</span>\n`;
                output += `   ${project.description}\n`;
                output += `   Tech: ${project.tech.join(', ')}\n`;
                if (project.github) {
                    output += `   <a href="${project.github}" class="terminal-link" target="_blank">View on GitHub</a>\n`;
                }
                output += '\n';
            });

            return output.trim();
        }
    },

    gallery: {
        description: "Open art gallery",
        execute: () => {
            const artSection = document.getElementById('art');
            if (artSection) {
                artSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                window.currentSection = 'art';
                return `<span class="terminal-success">Opening gallery... ~/vault/art/</span>`;
            }
            return `<span class="terminal-error">Gallery section not found.</span>`;
        }
    },

    view: {
        description: "Alias for gallery",
        execute: () => commands.gallery.execute()
    },

    contact: {
        description: "Show contact information",
        execute: () => {
            const { contact, profile } = portfolioData;
            return `
<span class="terminal-success">Contact Information:</span>

<span class="terminal-prompt-symbol">Email:</span> ${contact.email}
<span class="terminal-prompt-symbol">GitHub:</span> <a href="${profile.github}" class="terminal-link" target="_blank">${contact.github}</a>
<span class="terminal-prompt-symbol">LinkedIn:</span> <a href="${profile.linkedin}" class="terminal-link" target="_blank">${contact.linkedin}</a>
<span class="terminal-prompt-symbol">Instagram:</span> <a href="${profile.instagram}" class="terminal-link" target="_blank">${contact.instagram}</a>
<span class="terminal-prompt-symbol">LeetCode:</span> <a href="${profile.leetcode}" class="terminal-link" target="_blank">${contact.leetcode}</a>
      `.trim();
        }
    },

    pwd: {
        description: "Show current section",
        execute: () => {
            const currentSection = window.currentSection || 'hero';
            const section = portfolioData.sections.find(s => s.id === currentSection);
            return `<span class="terminal-output-text">/portfolio/${section ? section.name.toLowerCase() : 'home'}</span>`;
        }
    },

    clear: {
        description: "Clear terminal output",
        execute: () => {
            const output = document.querySelector('.terminal-output');
            if (output) {
                output.innerHTML = '';
            }
            return null;
        }
    },

    neofetch: {
        description: "Display system information",
        execute: () => {
            const { profile, skills, projects } = portfolioData;
            const totalSkills = Object.values(skills).flat().length;

            return `<div class="neofetch-display" style="padding: 10px; background: transparent; line-height: 1.2;"><div class="neofetch-right"><div class="neofetch-header" style="margin-bottom: 15px; font-size: 1.3rem; background: rgba(74, 222, 128, 0.1); border: 1px solid var(--terminal-success); padding: 5px 20px; border-radius: 6px; width: fit-content; text-align: left; box-shadow: 0 0 15px rgba(74, 222, 128, 0.1);">mahesh@portfolio</div><div class="neofetch-info" style="margin-bottom: 5px;"><span class="info-label" style="min-width: 100px; display: inline-block; color: var(--terminal-success);">User:</span> mahesh</div><div class="neofetch-info" style="margin-bottom: 5px;"><span class="info-label" style="min-width: 100px; display: inline-block; color: var(--terminal-success);">Location:</span> ${profile.location}</div><div class="neofetch-info" style="margin-bottom: 5px;"><span class="info-label" style="min-width: 100px; display: inline-block; color: var(--terminal-success);">Born:</span> 2005</div><div class="neofetch-info" style="margin-bottom: 5px;"><span class="info-label" style="min-width: 100px; display: inline-block; color: var(--terminal-success);">Role:</span> 3rd Year Student</div><div class="neofetch-info" style="margin-bottom: 5px;"><span class="info-label" style="min-width: 100px; display: inline-block; color: var(--terminal-success);">Status:</span> Learning & exploring</div><div class="neofetch-info" style="margin-bottom: 5px;"><span class="info-label" style="min-width: 100px; display: inline-block; color: var(--terminal-success);">Locale:</span> en-IN</div><div class="neofetch-info" style="margin-bottom: 5px;"><span class="info-label" style="min-width: 100px; display: inline-block; color: var(--terminal-success);">Timezone:</span> IST (UTC+5:30)</div><div class="neofetch-info" style="margin-bottom: 5px;"><span class="info-label" style="min-width: 100px; display: inline-block; color: var(--terminal-success);">OS:</span> Portfolio Linux v1.0</div><div class="neofetch-info" style="margin-bottom: 5px;"><span class="info-label" style="min-width: 100px; display: inline-block; color: var(--terminal-success);">Shell:</span> portfolio-sh</div><div class="neofetch-info" style="margin-bottom: 5px;"><span class="info-label" style="min-width: 100px; display: inline-block; color: var(--terminal-success);">Skills:</span> ${totalSkills} packages installed</div><div class="neofetch-info" style="margin-bottom: 5px;"><span class="info-label" style="min-width: 100px; display: inline-block; color: var(--terminal-success);">Projects:</span> ${projects.length} workspaces</div></div></div>`;
        }
    },

    download: {
        description: "Download resume",
        execute: (args) => {
            if (args && args[0] === 'resume') {
                // Open in new tab to avoid browser security blocks
                window.open(portfolioData.contact.resume, '_blank');
                return `<span class="terminal-success">Opening resume.pdf...</span>`;
            }
            return `<span class="terminal-error">download: specify 'resume'</span>`;
        }
    },

    exit: {
        description: "Exit the terminal session",
        execute: () => {
            location.reload();
            return "Rebooting...";
        }
    },

    oneko: {
        description: "Toggle the oneko cat",
        execute: () => {
            if (window.toggleOneko) {
                return window.toggleOneko();
            }
            return "Oneko script not loaded.";
        }
    }
};

// Parse and execute command
function executeCommand(input) {
    const parts = input.trim().split(/\s+/);
    const commandName = parts[0].toLowerCase();
    const args = parts.slice(1);

    const command = commands[commandName];

    if (!command) {
        return `<span class="terminal-error">Command not found: ${commandName}. Type 'help' for available commands.</span>`;
    }

    return command.execute(args);
}
