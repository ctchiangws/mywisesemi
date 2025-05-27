
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
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (line.startsWith('## ') && !line.includes('Company Announcements')) {
        // Save previous announcement if it exists
        if (currentAnnouncement.title) {
          announcements.push({
            id: String(id++),
            title: currentAnnouncement.title || '',
            description: currentAnnouncement.description || '',
            date: currentAnnouncement.date || '',
            important: currentAnnouncement.important || false
          });
        }
        
        // Start new announcement
        currentAnnouncement = {
          title: line.substring(3).trim()
        };
      } else if (line.startsWith('**Date:') && line.includes('|')) {
        const parts = line.split('|');
        const datePart = parts[0].replace('**Date:', '').replace('**', '').trim();
        const importantPart = parts[1] ? parts[1].trim() : '';
        
        currentAnnouncement.date = datePart;
        currentAnnouncement.important = importantPart.toLowerCase().includes('important');
      } else if (line.startsWith('**Date:')) {
        const datePart = line.replace('**Date:', '').replace('**', '').trim();
        currentAnnouncement.date = datePart;
        currentAnnouncement.important = false;
      } else if (line && !line.startsWith('#') && !line.startsWith('**Date:') && currentAnnouncement.title) {
        currentAnnouncement.description = (currentAnnouncement.description || '') + ' ' + line;
      }
    }
    
    // Add the last announcement
    if (currentAnnouncement.title) {
      announcements.push({
        id: String(id++),
        title: currentAnnouncement.title || '',
        description: currentAnnouncement.description?.trim() || '',
        date: currentAnnouncement.date || '',
        important: currentAnnouncement.important || false
      });
    }
    
    return announcements;
  }
};
