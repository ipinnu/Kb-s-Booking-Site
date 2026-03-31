import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://azffgoobfixgmplzswto.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6ZmZnb29iZml4Z21wbHpzd3RvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5ODgyMjIsImV4cCI6MjA5MDU2NDIyMn0.mhE4zl_PXLdoSYEMwdPAzZUQuc6l3LhsQ93YCjQ1908'
);
