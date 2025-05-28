
export interface ParsedAnnouncement {
  id: string;
  title: string;
  description: string;
  date: string;
  important: boolean;
}

export const announcementsService = {
  parseMarkdown(content: string): ParsedAnnouncement[] {
    const announcements: ParsedAnnouncement[] = [];
    const lines = content.split('\n');
    
    let currentAnnouncement: Partial<ParsedAnnouncement> = {};
    let id = 1;
    let collectingDescription = false;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (line.startsWith('## ') && !line.includes('Company Announcements')) {
        // Save previous announcement if it exists
        if (currentAnnouncement.title) {
          announcements.push({
            id: String(id++),
            title: currentAnnouncement.title || '',
            description: (currentAnnouncement.description || '').trim(),
            date: currentAnnouncement.date || '',
            important: currentAnnouncement.important || false
          });
        }
        
        // Start new announcement
        currentAnnouncement = {
          title: line.substring(3).trim(),
          description: ''
        };
        collectingDescription = false;
      } else if (line.startsWith('**Date:')) {
        const datePart = line.replace('**Date:', '').replace('**', '').trim();
        currentAnnouncement.date = datePart;
        currentAnnouncement.important = false;
        collectingDescription = true;
      } else if (line && !line.startsWith('#') && collectingDescription && currentAnnouncement.title) {
        // Collect description lines
        if (currentAnnouncement.description) {
          currentAnnouncement.description += ' ' + line;
        } else {
          currentAnnouncement.description = line;
        }
      }
    }
    
    // Add the last announcement
    if (currentAnnouncement.title) {
      announcements.push({
        id: String(id++),
        title: currentAnnouncement.title || '',
        description: (currentAnnouncement.description || '').trim(),
        date: currentAnnouncement.date || '',
        important: currentAnnouncement.important || false
      });
    }
    
    return announcements;
  }
};
