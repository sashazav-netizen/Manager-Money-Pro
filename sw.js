// אל תתעסק עם Firebase — תמיד מהרשת
if (url.includes('firebase') ||
    url.includes('firebasedatabase.app') ||
    url.includes('googleapis.com') ||
    url.includes('gstatic.com')) {
    return; // ← חשוב מאוד!
}
