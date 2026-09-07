import supabase from './db-client.js';

async function initTables() {
  try {
    await supabase.rpc('exec_sql', {
      query: `
        CREATE TABLE IF NOT EXISTS leads (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          phone TEXT NOT NULL,
          email TEXT,
          destination TEXT NOT NULL,
          notes TEXT,
          status TEXT DEFAULT 'New',
          created_at TIMESTAMPTZ DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS settings (
          key TEXT PRIMARY KEY,
          value JSONB NOT NULL,
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );
      `
    });
  } catch (e) {
    // Fallback if rpc isn't configured - application queries will handle existing tables
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return res.status(200).json(data || []);
    }

    if (req.method === 'POST') {
      const { name, phone, email, destination, notes } = req.body || {};

      if (!name || !phone || !destination) {
        return res.status(400).json({ error: 'Name, phone number, and destination are required.' });
      }

      const { data, error } = await supabase
        .from('leads')
        .insert({
          name: name.trim(),
          phone: phone.trim(),
          email: email ? email.trim() : null,
          destination: destination.trim(),
          notes: notes ? notes.trim() : '',
          status: 'New'
        })
        .select()
        .single();

      if (error) throw error;
      return res.status(201).json(data);
    }

    if (req.method === 'PUT') {
      const { id, status, notes } = req.body || {};
      if (!id) return res.status(400).json({ error: 'Lead ID required.' });

      const updates = {};
      if (status !== undefined) updates.status = status;
      if (notes !== undefined) updates.notes = notes;

      const { data, error } = await supabase
        .from('leads')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return res.status(200).json(data);
    }

    if (req.method === 'DELETE') {
      const { id } = req.body || {};
      if (!id) return res.status(400).json({ error: 'Lead ID required.' });

      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Leads API Error:', err);
    return res.status(500).json({ error: err.message || 'Server error' });
  }
}
