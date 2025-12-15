# 📖 Story Backend - Quick Reference

## Import
```javascript
import { storyService } from './services';
```

---

## Story Operations

### CREATE Story with Image
```javascript
// With image upload
const { story, error } = await storyService.createStory({
    trip_id: tripId,
    title: 'My Amazing Trip',
    story_text: 'This was an unforgettable journey...',
    image: base64Image,  // Auto-uploaded to Supabase Storage
    destination: 'Goa, India',
    tags: ['beach', 'adventure'],
    is_public: false
});

// Without image
const { story, error } = await storyService.createStory({
    trip_id: tripId,
    title: 'Travel Tips',
    story_text: 'Here are some tips...'
});
```

### READ Stories
```javascript
// Get all stories for user
const { stories, error } = await storyService.getStories();

// Get stories for specific trip
const { stories, error } = await storyService.getStoriesByTripId(tripId);

// Get single story
const { story, error } = await storyService.getStory(storyId);
```

### UPDATE Story
```javascript
// Update text
const { story, error } = await storyService.updateStory(storyId, {
    title: 'Updated Title',
    story_text: 'Updated content...'
});

// Update image (old image deleted, new one uploaded)
const { story, error } = await storyService.updateStory(storyId, {
    image: newBase64Image
});
```

### DELETE Story
```javascript
// Deletes story and associated image
const { error } = await storyService.deleteStory(storyId);
```

---

## Image Operations

### Upload Image
```javascript
const { url, error } = await storyService.uploadImage(base64Image);
// Returns Supabase Storage URL
```

### Delete Image
```javascript
const { error } = await storyService.deleteImage(imageUrl);
// Automatically called when deleting story
```

---

## Convert File to Base64
```javascript
const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};

// Usage
const base64 = await convertToBase64(imageFile);
```

---

## Story Structure
```javascript
{
    id: 'story_123...',
    trip_id: 'trip_456...',
    user_id: 'user_789...',
    title: 'My Amazing Trip',
    story_text: 'Story content...',
    image: 'https://...supabase.co/storage/.../image.jpg',
    destination: 'Goa, India',
    tags: ['beach', 'adventure'],
    is_public: false,
    likes_count: 0,
    created_at: '2024-12-15T10:00:00Z',
    updated_at: '2024-12-15T10:00:00Z'
}
```

---

## Complete Example
```javascript
const StoryManager = ({ tripId }) => {
    const [stories, setStories] = useState([]);
    const [image, setImage] = useState(null);

    useEffect(() => {
        loadStories();
    }, [tripId]);

    const loadStories = async () => {
        const { stories } = await storyService.getStoriesByTripId(tripId);
        setStories(stories);
    };

    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => setImage(e.target.result);
        reader.readAsDataURL(file);
    };

    const createStory = async (title, content) => {
        const { story, error } = await storyService.createStory({
            trip_id: tripId,
            title,
            story_text: content,
            image
        });

        if (!error) {
            loadStories();
            alert('Story created!');
        }
    };

    const deleteStory = async (storyId) => {
        if (confirm('Delete?')) {
            await storyService.deleteStory(storyId);
            loadStories();
        }
    };

    return (
        <div>
            <input type="file" onChange={handleImageSelect} />
            {image && <img src={image} style={{ maxWidth: '200px' }} />}
            
            {stories.map(story => (
                <div key={story.id}>
                    {story.image && (
                        <img
                            src={story.image}
                            onError={(e) => e.target.style.display = 'none'}
                        />
                    )}
                    <h3>{story.title}</h3>
                    <p>{story.story_text}</p>
                    <button onClick={() => deleteStory(story.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};
```

---

## Handle Missing Images
```javascript
<img
    src={story.image}
    alt={story.title}
    onError={(e) => {
        e.target.style.display = 'none'; // Hide broken image
        // Or use placeholder:
        // e.target.src = '/placeholder.jpg';
    }}
/>
```

---

## Image Validation
```javascript
const handleImageSelect = (e) => {
    const file = e.target.files[0];
    
    // Check size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        alert('Image too large. Max 5MB.');
        return;
    }

    // Check type
    if (!file.type.startsWith('image/')) {
        alert('Please select an image file.');
        return;
    }

    // Convert to base64
    const reader = new FileReader();
    reader.onload = (e) => setImage(e.target.result);
    reader.readAsDataURL(file);
};
```

---

## Access Control

### LOCAL Mode
- No auth required
- Images as base64 in localStorage
- Filtered by trip_id

### SUPABASE Mode
- User must be authenticated
- Images in Supabase Storage
- RLS policies enforce ownership
- Only trip owner can access

---

## Storage Path
```
story-images/
  └── {user_id}/
      ├── story_1234567890_abc123.jpg
      ├── story_1234567891_def456.jpg
      └── ...
```

---

## Best Practices

✅ Handle missing images gracefully
✅ Validate image size before upload
✅ Compress large images
✅ Show upload progress
✅ Confirm before delete
✅ Use onError for image tags

---

**Full Guide**: `STORY_BACKEND_GUIDE.md`
