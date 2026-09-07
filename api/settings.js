import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('settings')
        .select('*');

      if (error && error.code !== 'PGRST116') throw error;

      const config = {};
      (data || []).forEach(row => {
        config[row.key] = row.value;
      });

      return res.status(200).json({
        agencyName: config.agencyName || 'Ananddam Holidays',
        agencyHindiName: config.agencyHindiName || 'आनंददाम हॉलीडेज',
        director: config.director || 'Amol Anandrao Bodulwar',
        address: config.address || 'New Subhedar Layout, Ayodhya nagar, Nagpur, Maharashtra 440024',
        operatingHours: config.operatingHours || 'Open daily, Closes at 7:00 PM',
        phone: config.phone || '',
        email: config.email || 'inquiries@ananddamholidays.com',
        whatsapp: config.whatsapp || ''
      });
    }

    if (req.method === 'POST') {
      const { phone, email, whatsapp, operatingHours, address } = req.body || {};

      const updates = [
        { key: 'phone', value: phone ?? '' },
        { key: 'email', value: email ?? 'inquiries@ananddamholidays.com' },
        { key: 'whatsapp', value: whatsapp ?? '' },
        { key: 'operatingHours', value: operatingHours ?? 'Open daily, Closes at 7:00 PM' },
        { key: 'address', value: address ?? 'New Subhedar Layout, Ayodhya nagar, Nagpur, Maharashtra 440024' }
      ];

      for (const item of updates) {
        await supabase
          .from('settings')
          .upsert({ key: item.key, value: item.value, updated_at: new Date().toISOString() });
      }

      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Settings API Error:', err);
    return res.status(500).json({ error: err.message || 'Server error' });
  }
}
