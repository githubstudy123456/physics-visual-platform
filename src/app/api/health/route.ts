import { NextResponse } from 'next/server'
import { hasSupabaseConfig } from '../../../lib/supabase'

export function GET() {
  return NextResponse.json({
    ok: true,
    app: 'physics-visual-platform',
    supabaseConfigured: hasSupabaseConfig(),
  })
}
