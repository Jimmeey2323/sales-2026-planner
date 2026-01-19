export async function updateConstantsFile(data: any[]) {
  try {
    // Add timeout to prevent hanging
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
    
    const response = await fetch('http://localhost:3001/api/update-constants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ monthsData: data }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to update constants file');
    }

    console.log('✅ Constants file updated:', result);
    return result;
  } catch (error) {
    // Handle specific error cases with friendly messages
    if (error.name === 'AbortError') {
      console.warn('⚠️ Constants file server not running (timeout). Database save completed successfully.');
      return { success: false, error: 'Server timeout - run "npm run server" to enable constants file sync' };
    } else if (error.message?.includes('fetch')) {
      console.warn('⚠️ Constants file server not reachable. Database save completed successfully.');
      return { success: false, error: 'Server not running - run "npm run server" to enable constants file sync' };
    }
    
    console.error('❌ Error updating constants file:', error);
    throw error;
  }
}
