# 📖 Trip Stories & Media Storage - Complete Guide

## Overview

The `storyService` provides complete backend support for Trip Stories with media storage:
- ✅ Upload images to Supabase Storage
- ✅ Store story text and image URL together
- ✅ Fetch stories per trip
- ✅ Update or delete stories
- ✅ Trip owner access control
- ✅ Graceful handling of missing images

---

## 📋 Available Operations

### Story Operations
1. **CREATE** - Create story with image upload
2. **READ** - Get all stories for user
3. **READ** - Get stories for specific trip
4. **READ** - Get single story
5. **UPDATE** - Update story (with image)
6. **DELETE** - Delete story (and image)

### Image Operations
7. **UPLOAD** - Upload image to Supabase Storage
8. **DELETE** - Delete image from storage

---

## 🔧 Import

```javascript
import { storyService } from './services';
// or
import storyService from './services/storyService';
```

---

## 1️⃣ CREATE Story with Image

### Method
```javascript
storyService.createStory(storyData)
```

### Parameters
```javascript
{
    trip_id: string,          // Required - Trip ID
    title: string,            // Required - Story title
    story_text: string,       // Required - Story content
    image: string,            // Optional - Base64 or URL
    destination: string,      // Optional - Destination name
    tags: Array<string>,      // Optional - Story tags
    is_public: boolean        // Optional - Public visibility
}
```

### Image Handling
- **Base64 Image**: Automatically uploaded to Supabase Storage
- **URL**: Stored as-is
- **Missing**: Story created without image

### Response
```javascript
{
    story: {
        id: string,
        trip_id: string,
        user_id: string,       // Auto-added in Supabase mode
        title: string,
        story_text: string,
        image: string,         // URL or base64
        destination: string,
        tags: Array<string>,
        is_public: boolean,
        likes_count: number,
        created_at: string,
        updated_at: string
    },
    error: null | Error
}
```

### Example Usage

```javascript
// Create story with image upload
const createStoryWithImage = async (tripId, imageFile) => {
    // Convert image file to base64
    const base64Image = await convertToBase64(imageFile);

    const { story, error } = await storyService.createStory({
        trip_id: tripId,
        title: 'My Amazing Goa Trip',
        story_text: 'This was an unforgettable journey through the beaches of Goa...',
        image: base64Image,  // Will be uploaded to Supabase Storage
        destination: 'Goa, India',
        tags: ['beach', 'adventure', 'food'],
        is_public: false
    });

    if (error) {
        console.error('Failed to create story:', error);
        return null;
    }

    console.log('Story created with image URL:', story.image);
    return story;
};

// Helper: Convert file to base64
const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};

// Create story without image
const createTextStory = async (tripId) => {
    const { story, error } = await storyService.createStory({
        trip_id: tripId,
        title: 'Travel Tips',
        story_text: 'Here are some tips for traveling to Goa...',
        destination: 'Goa, India'
    });

    return story;
};

// Create story in component
const StoryCreator = ({ tripId }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);

    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setImage(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { story, error } = await storyService.createStory({
            trip_id: tripId,
            title,
            story_text: content,
            image
        });

        if (error) {
            alert('Failed to create story');
            return;
        }

        alert('Story created successfully!');
        // Reset form or navigate
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Story Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Write your story..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            />
            <input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
            />
            {image && <img src={image} alt="Preview" style={{ maxWidth: '200px' }} />}
            <button type="submit">Create Story</button>
        </form>
    );
};
```

---

## 2️⃣ READ Stories

### Get All Stories for User

#### Method
```javascript
storyService.getStories()
```

#### Response
```javascript
{
    stories: Array<Story>,  // Sorted by created_at DESC
    error: null | Error
}
```

#### Example Usage

```javascript
// Load all user's stories
const loadAllStories = async () => {
    const { stories, error } = await storyService.getStories();

    if (error) {
        console.error('Failed to load stories:', error);
        return [];
    }

    console.log(`Loaded ${stories.length} stories`);
    return stories;
};
```

### Get Stories for a Trip

#### Method
```javascript
storyService.getStoriesByTripId(tripId)
```

#### Example Usage

```javascript
// Load stories for specific trip
const loadTripStories = async (tripId) => {
    const { stories, error } = await storyService.getStoriesByTripId(tripId);

    if (error) {
        console.error('Failed to load trip stories:', error);
        return [];
    }

    return stories;
};

// Display in component
const TripStories = ({ tripId }) => {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStories();
    }, [tripId]);

    const loadStories = async () => {
        setLoading(true);
        const { stories, error } = await storyService.getStoriesByTripId(tripId);
        
        if (!error) {
            setStories(stories);
        }
        
        setLoading(false);
    };

    if (loading) return <div>Loading stories...</div>;

    return (
        <div className="trip-stories">
            <h2>Trip Stories ({stories.length})</h2>
            {stories.length === 0 ? (
                <p>No stories yet. Create your first story!</p>
            ) : (
                <div className="stories-grid">
                    {stories.map(story => (
                        <StoryCard key={story.id} story={story} />
                    ))}
                </div>
            )}
        </div>
    );
};
```

### Get Single Story

#### Method
```javascript
storyService.getStory(storyId)
```

#### Example Usage

```javascript
// Load single story
const loadStory = async (storyId) => {
    const { story, error } = await storyService.getStory(storyId);

    if (error || !story) {
        console.error('Story not found');
        return null;
    }

    return story;
};

// Display story details
const StoryDetails = ({ storyId }) => {
    const [story, setStory] = useState(null);

    useEffect(() => {
        loadStoryDetails();
    }, [storyId]);

    const loadStoryDetails = async () => {
        const { story } = await storyService.getStory(storyId);
        setStory(story);
    };

    if (!story) return <div>Loading...</div>;

    return (
        <div className="story-details">
            {story.image && (
                <img
                    src={story.image}
                    alt={story.title}
                    onError={(e) => {
                        e.target.style.display = 'none'; // Hide if image fails
                    }}
                />
            )}
            <h1>{story.title}</h1>
            <p className="destination">{story.destination}</p>
            <div className="story-content">{story.story_text}</div>
            {story.tags && (
                <div className="tags">
                    {story.tags.map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                    ))}
                </div>
            )}
            <p className="date">
                Created: {new Date(story.created_at).toLocaleDateString()}
            </p>
        </div>
    );
};
```

---

## 3️⃣ UPDATE Story

### Method
```javascript
storyService.updateStory(storyId, updates)
```

### Parameters
- `storyId` (string): Story ID
- `updates` (object): Fields to update

### Image Update
- **New Base64 Image**: Uploaded to storage, old image deleted
- **New URL**: Stored as-is
- **Unchanged**: Keep existing image

### Example Usage

```javascript
// Update story text
const updateStoryText = async (storyId, newTitle, newText) => {
    const { story, error } = await storyService.updateStory(storyId, {
        title: newTitle,
        story_text: newText
    });

    if (error) {
        console.error('Failed to update story:', error);
        return null;
    }

    return story;
};

// Update story image
const updateStoryImage = async (storyId, newImageFile) => {
    const base64Image = await convertToBase64(newImageFile);

    const { story, error } = await storyService.updateStory(storyId, {
        image: base64Image  // Old image will be deleted, new one uploaded
    });

    return story;
};

// Update in component
const EditStory = ({ storyId }) => {
    const [story, setStory] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);

    useEffect(() => {
        loadStory();
    }, [storyId]);

    const loadStory = async () => {
        const { story } = await storyService.getStory(storyId);
        if (story) {
            setStory(story);
            setTitle(story.title);
            setContent(story.story_text);
            setImage(story.image);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setImage(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        const { story, error } = await storyService.updateStory(storyId, {
            title,
            story_text: content,
            image
        });

        if (error) {
            alert('Failed to update story');
            return;
        }

        alert('Story updated successfully!');
    };

    return story ? (
        <div>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {image && <img src={image} alt="Preview" style={{ maxWidth: '200px' }} />}
            <button onClick={handleSave}>Save Changes</button>
        </div>
    ) : null;
};
```

---

## 4️⃣ DELETE Story

### Method
```javascript
storyService.deleteStory(storyId)
```

### Behavior
- Deletes story from database
- Automatically deletes associated image from Supabase Storage
- Gracefully handles missing images

### Example Usage

```javascript
// Delete story
const removeStory = async (storyId) => {
    if (!confirm('Delete this story? This cannot be undone.')) {
        return;
    }

    const { error } = await storyService.deleteStory(storyId);

    if (error) {
        console.error('Failed to delete story:', error);
        alert('Error deleting story');
        return false;
    }

    alert('Story deleted successfully!');
    return true;
};

// Delete in component
const StoryCard = ({ story, onDelete }) => {
    const handleDelete = async () => {
        if (!confirm(`Delete "${story.title}"?`)) {
            return;
        }

        const { error } = await storyService.deleteStory(story.id);

        if (error) {
            alert('Failed to delete story');
            return;
        }

        alert('Story deleted!');
        onDelete(story.id); // Callback to update UI
    };

    return (
        <div className="story-card">
            {story.image && (
                <img
                    src={story.image}
                    alt={story.title}
                    onError={(e) => e.target.style.display = 'none'}
                />
            )}
            <h3>{story.title}</h3>
            <p>{story.story_text.substring(0, 100)}...</p>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};
```

---

## 5️⃣ IMAGE Operations

### Upload Image

#### Method
```javascript
storyService.uploadImage(base64Image)
```

#### Example Usage

```javascript
// Upload image separately
const uploadStoryImage = async (imageFile) => {
    const base64Image = await convertToBase64(imageFile);

    const { url, error } = await storyService.uploadImage(base64Image);

    if (error) {
        console.error('Image upload failed:', error);
        return null;
    }

    console.log('Image uploaded:', url);
    return url;
};

// Use uploaded URL in story
const createStoryWithUploadedImage = async (tripId, imageFile) => {
    // Upload image first
    const imageUrl = await uploadStoryImage(imageFile);

    if (!imageUrl) {
        alert('Image upload failed');
        return;
    }

    // Create story with URL
    const { story } = await storyService.createStory({
        trip_id: tripId,
        title: 'My Story',
        story_text: 'Story content...',
        image: imageUrl
    });

    return story;
};
```

### Delete Image

#### Method
```javascript
storyService.deleteImage(imageUrl)
```

#### Note
- Automatically called when deleting a story
- Can be called manually if needed
- Gracefully handles invalid URLs

---

## 🎯 Complete Example: Story Manager Component

```javascript
import { useState, useEffect } from 'react';
import { storyService } from './services';

const StoryManager = ({ tripId }) => {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        image: null
    });

    // Load stories on mount
    useEffect(() => {
        loadStories();
    }, [tripId]);

    const loadStories = async () => {
        setLoading(true);
        const { stories, error } = await storyService.getStoriesByTripId(tripId);
        
        if (!error) {
            setStories(stories);
        }
        
        setLoading(false);
    };

    // Handle image selection
    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setFormData({ ...formData, image: e.target.result });
            };
            reader.readAsDataURL(file);
        }
    };

    // Create story
    const handleCreate = async (e) => {
        e.preventDefault();

        const { story, error } = await storyService.createStory({
            trip_id: tripId,
            title: formData.title,
            story_text: formData.content,
            image: formData.image
        });

        if (error) {
            alert('Failed to create story');
            return;
        }

        alert('Story created successfully!');
        setFormData({ title: '', content: '', image: null });
        setShowForm(false);
        loadStories(); // Refresh list
    };

    // Delete story
    const handleDelete = async (storyId) => {
        if (!confirm('Delete this story?')) return;

        const { error } = await storyService.deleteStory(storyId);

        if (error) {
            alert('Failed to delete story');
            return;
        }

        alert('Story deleted!');
        loadStories();
    };

    return (
        <div className="story-manager">
            <h1>Trip Stories</h1>

            {/* Create Button */}
            <button onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Cancel' : '+ Create Story'}
            </button>

            {/* Create Form */}
            {showForm && (
                <form onSubmit={handleCreate} className="story-form">
                    <h2>Create New Story</h2>
                    
                    <input
                        type="text"
                        placeholder="Story Title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                    />

                    <textarea
                        placeholder="Write your story..."
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        rows={10}
                        required
                    />

                    <div className="image-upload">
                        <label>Add Image (Optional)</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageSelect}
                        />
                        {formData.image && (
                            <img
                                src={formData.image}
                                alt="Preview"
                                style={{ maxWidth: '300px', marginTop: '10px' }}
                            />
                        )}
                    </div>

                    <button type="submit">Create Story</button>
                </form>
            )}

            {/* Stories List */}
            <div className="stories-list">
                {loading ? (
                    <p>Loading stories...</p>
                ) : stories.length === 0 ? (
                    <p>No stories yet. Create your first story!</p>
                ) : (
                    <div className="stories-grid">
                        {stories.map(story => (
                            <div key={story.id} className="story-card">
                                {story.image && (
                                    <img
                                        src={story.image}
                                        alt={story.title}
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                        }}
                                    />
                                )}
                                <h3>{story.title}</h3>
                                <p className="excerpt">
                                    {story.story_text.substring(0, 150)}...
                                </p>
                                <p className="date">
                                    {new Date(story.created_at).toLocaleDateString()}
                                </p>
                                <div className="actions">
                                    <button onClick={() => handleDelete(story.id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StoryManager;
```

---

## 🔐 Access Control

### LOCAL Mode
- No authentication required
- Images stored as base64 in localStorage
- All stories in localStorage
- Filtered by trip_id

### SUPABASE Mode
- User must be authenticated
- Images uploaded to Supabase Storage (`story-images` bucket)
- RLS policies enforce ownership
- Users can only access stories for their trips

### RLS Policy Example
```sql
-- Users can only view stories for their own trips
CREATE POLICY "Users can view own trip stories"
    ON stories FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM trips
            WHERE trips.id = stories.trip_id
            AND trips.user_id = auth.uid()
        )
    );
```

### Storage Policy Example
```sql
-- Users can upload images to their own folder
CREATE POLICY "Users can upload story images"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'story-images' AND
        auth.uid()::text = (storage.foldername(name))[1]
    );
```

---

## 📊 Data Format

### Story Object
```javascript
{
    id: 'story_123...',
    trip_id: 'trip_456...',
    user_id: 'user_789...',
    title: 'My Amazing Trip',
    story_text: 'This was an unforgettable journey...',
    image: 'https://...supabase.co/storage/.../image.jpg',
    destination: 'Goa, India',
    tags: ['beach', 'adventure'],
    is_public: false,
    likes_count: 0,
    created_at: '2024-12-15T10:00:00Z',
    updated_at: '2024-12-15T10:00:00Z'
}
```

### Image Storage Path
```
story-images/
  └── {user_id}/
      ├── story_1234567890_abc123.jpg
      ├── story_1234567891_def456.jpg
      └── ...
```

---

## ✅ Best Practices

### 1. Handle Missing Images
```javascript
<img
    src={story.image}
    alt={story.title}
    onError={(e) => {
        e.target.style.display = 'none'; // Hide broken image
        // Or show placeholder
        // e.target.src = '/placeholder.jpg';
    }}
/>
```

### 2. Validate Image Size
```javascript
const handleImageSelect = (e) => {
    const file = e.target.files[0];
    
    // Check file size (e.g., max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        alert('Image too large. Max 5MB.');
        return;
    }

    // Convert to base64
    const reader = new FileReader();
    reader.onload = (e) => setImage(e.target.result);
    reader.readAsDataURL(file);
};
```

### 3. Compress Images
```javascript
const compressImage = async (base64Image, maxWidth = 1200) => {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = base64Image;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;

            if (width > maxWidth) {
                height = (height * maxWidth) / width;
                width = maxWidth;
            }

            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            resolve(canvas.toDataURL('image/jpeg', 0.8));
        };
    });
};
```

### 4. Show Upload Progress
```javascript
const [uploading, setUploading] = useState(false);

const handleCreate = async () => {
    setUploading(true);
    
    const { story, error } = await storyService.createStory({...});
    
    setUploading(false);
    
    if (!error) {
        alert('Story created!');
    }
};
```

### 5. Confirm Before Delete
```javascript
const handleDelete = async (storyId) => {
    if (!confirm('Delete this story? This will also delete the image.')) {
        return;
    }

    await storyService.deleteStory(storyId);
};
```

---

## 🎉 Summary

The `storyService` provides:
- ✅ **Complete story management**
- ✅ **Image upload to Supabase Storage**
- ✅ **Automatic image handling**
- ✅ **Trip-based organization**
- ✅ **Owner access control**
- ✅ **Graceful error handling**
- ✅ **Works in both modes** (LOCAL & SUPABASE)

**Your Trip Stories backend is ready!** 🚀
