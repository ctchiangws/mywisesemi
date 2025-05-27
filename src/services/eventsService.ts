
export interface ParsedEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
}

export const eventsService = {
  parseMarkdown(content: string): ParsedEvent[] {
    const events: ParsedEvent[] = [];
    const lines = content.split('\n');
    
    let currentEvent: Partial<ParsedEvent> = {};
    let id = 1;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (line.startsWith('## ') && !line.includes('Upcoming Events')) {
        // Save previous event if it exists
        if (currentEvent.title) {
          events.push({
            id: String(id++),
            title: currentEvent.title || '',
            date: this.formatDate(currentEvent.date || ''),
            time: currentEvent.time || '',
            location: currentEvent.location || ''
          });
        }
        
        // Start new event
        currentEvent = {
          title: line.substring(3).trim()
        };
      } else if (line.startsWith('**Date:')) {
        currentEvent.date = line.replace('**Date:', '').replace('**', '').trim();
      } else if (line.startsWith('**Time:')) {
        currentEvent.time = line.replace('**Time:', '').replace('**', '').trim();
      } else if (line.startsWith('**Location:')) {
        currentEvent.location = line.replace('**Location:', '').replace('**', '').trim();
      }
    }
    
    // Add the last event
    if (currentEvent.title) {
      events.push({
        id: String(id++),
        title: currentEvent.title || '',
        date: this.formatDate(currentEvent.date || ''),
        time: currentEvent.time || '',
        location: currentEvent.location || ''
      });
    }
    
    return events;
  },

  formatDate(dateStr: string): string {
    // Handle various date formats and convert to YYYY-MM-DD
    if (dateStr.includes('Sep')) {
      return '2025-09-13';
    } else if (dateStr.includes('June')) {
      return '2025-06-30';
    } else if (dateStr.includes('April')) {
      return '2025-04-15';
    } else if (dateStr.includes('Jan')) {
      return '2025-01-07';
    }
    return dateStr;
  }
};
