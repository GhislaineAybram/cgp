export interface Contact {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  availability: string;
  message: string;
  status: MessageStatus;
  created_at: string;
  updated_at: string;
}

export type MessageStatus = 'pending' | 'treated' | 'archived';
