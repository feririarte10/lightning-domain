import { NextRequest, NextResponse } from 'next/server';
import { generateLUD06 } from '~/lib/utils';
import { prisma } from '~/server/db';

export async function GET(request: NextRequest, { params }: { params: { name: string } }) {
  let name = params.name;

  // Check if exists
  if (!name) return NextResponse.json({ data: 'Not found' }, { status: 404 });

  name = name.toLowerCase().trim();

  // Find identity record by name
  const identityRecord = await prisma.identity.findUnique({
    where: {
      name,
    },
  });

  // Check if exists
  if (!identityRecord) return NextResponse.json({ data: 'Not found' }, { status: 404 });

  // Respond LUD06
  return NextResponse.json({ data: generateLUD06(name) }, { status: 200 });
}