<template>
  <div>
    <header-global />
    
    <!-- Video Page Main Content -->
    <main class="video-page">
      <div class="container">
        <!-- Page Header -->
        <section class="page-header">
          <h1 class="page-title">Weight Loss Video Library</h1>
          <p class="page-subtitle">
            Explore comprehensive weight loss videos from high-intensity workouts to nutrition guides. 
            Find inspiration and solutions for your fitness goals.
          </p>
        </section>

        <!-- Category Filters -->
        <section class="video-filters">
          <div class="filter-tabs">
            <button 
              v-for="category in categories" 
              :key="category.id"
              :class="['filter-tab', { active: activeCategory === category.id }]"
              @click="activeCategory = category.id"
            >
              {{ category.name }}
            </button>
          </div>
        </section>

        <!-- Video Grid -->
        <section class="video-list-section">
          <div class="video-grid">
            <div 
              v-for="video in filteredVideos" 
              :key="video.id"
              class="video-card"
              @click="openVideo(video)"
            >
              <div class="video-thumbnail">
                <img 
                  :src="video.thumbnail" 
                  :alt="video.title"
                  class="thumbnail-image"
                />
                <div class="video-duration">{{ video.duration }}</div>
                <div class="play-overlay">
                  <span class="play-icon">▶</span>
                </div>
              </div>
              <div class="video-info">
                <h3 class="video-title">{{ video.title }}</h3>
                <p class="video-description">{{ video.description }}</p>
                <div class="video-meta">
                  <span class="video-category">{{ video.category }}</span>
                  <span class="video-views">{{ video.views }} views</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Load More Button -->
        <section class="load-more-section" v-if="hasMoreVideos">
          <button class="load-more-btn" @click="loadMoreVideos">
            Load More Videos
          </button>
        </section>
      </div>
    </main>

    <!-- Video Modal -->
    <div v-if="selectedVideo" class="video-modal" @click="closeVideo">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">{{ selectedVideo.title }}</h3>
          <button class="close-btn" @click="closeVideo">✕</button>
           
        </div>
          
        <div class="modal-video">
          <!-- iframe video -->
          <iframe
            v-if="selectedVideo.type === 'iframe'"
            :src="selectedVideo.src"
            scrolling="no"
            border="0"
            frameborder="no"
            framespacing="0"
            allowfullscreen="true"
          ></iframe>
          <!-- local video -->
          <video
            v-else
            controls
            autoplay
            :src="selectedVideo.src"
          ></video>
    
          <p></p>
        </div>
          
        <div class="modal-info">
          <p class="modal-description">{{ selectedVideo.description }}</p>
          <div class="modal-meta">
            <span class="meta-item">⏱ {{ selectedVideo.duration }}</span>
            <span class="meta-item">👁 {{ selectedVideo.views }} views</span>
            <span class="meta-category">{{ selectedVideo.category }}</span>
            <span> {{ selectedVideo.notes }}</span>
          </div>
     
        </div>
      </div>
    </div>

    <footer-global />
  </div>
</template>

<script>
import HeaderGlobal from "@/components/headerglobal.vue";
import FooterGlobal from "@/components/footerglobal.vue";

export default {
  components: {
    HeaderGlobal,
    FooterGlobal,
  },
  head() {
    return {
      title: "Weight Loss Video Library - Professional Fitness & Nutrition Videos",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Explore comprehensive weight loss videos from high-intensity workouts to nutrition guides. Find inspiration and solutions for your fitness goals.",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "Weight Loss Video Library - Professional Fitness & Nutrition Videos",
        },
        {
          hid: "og:description",
          property: "og:description",
          content: "Explore comprehensive weight loss videos from high-intensity workouts to nutrition guides. Find inspiration and solutions for your fitness goals.",
        },
      ],
    };
  },
  data() {
    return {
      activeCategory: "all",
      selectedVideo: null,
      displayedVideos: 8,
      totalVideos: 10,
      categories: [
        { id: "all", name: "All Videos" },
        { id: "workout", name: "Workouts" },
        { id: "diet", name: "Nutrition" },
        { id: "yoga", name: "Yoga" },
        { id: "cardio", name: "Cardio" },
      ],
      videos: [
        {
          id: 1,
          title: "How To Lose Weight Fast with Dr. Ken Fujioka | Ask the Expert",
          description: "How can you lose weight quickly and safely? Dr. Ken Fujioka answers common questions men and women have about losing weight, including the best food for weight loss, intermittent fasting, exercise and more.",
          thumbnail: "https://i.ytimg.com/vi/jvJuJpCtyic/hq720.jpg?sqp=-…BACGAY4AUAB&rs=AOn4CLCRwDYhP0utr0hf4J4ISLRK84qZtQ",
          duration: "2:21",
          category: "diet",
          views: "190K",
          type: "iframe",
          src: "https://www.youtube.com/embed/jvJuJpCtyic?si=gt6Bu0w2oZXBJgoX",
        },
        {
          id: 2,
          title: "How I Finally Lost Belly Fat Without the Gym (100% No Yo-Yo) ",
          description: " At Home Workout Routines & Meal Plan",
          thumbnail: "https://i.ytimg.com/vi/laM1jdQXu1c/hq720.jpg?sqp=-…BACGAY4AUAB&rs=AOn4CLA3sfMcAdA_MVFbGlUuLeqjtJ1H1g",
          duration: "15:39",
          category: "workout",
          views: "1.37m",
          type: "iframe",
          src: "https://www.youtube.com/embed/laM1jdQXu1c?si=3tg6rOaK34DR4wEd",
          notes: "Ultra-low intensity, ideal for weak, stiff, menstruating, or those with poor cardio, low stamina, or energy—fitness pros, please skip this! Pair with a lively anime-style song matching the BPM, then follow the music to move."
        },
        {
          id: 3,
          title: "if you can't lose weight: watch this  ",
          description: "Beginner's Guide to Fat Loss & Dieting",
          thumbnail: "https://i.ytimg.com/vi/TqT0WQ2TJ8g/hq720.jpg?sqp=-…BACGAY4AUAB&rs=AOn4CLBN6lVCt53b5duUtjLldpMlOGSSTg",
          duration: "8:22",
          category: "cardio",
          views: "3.8m",
          type: "iframe",
          src: "https://www.youtube.com/embed/TqT0WQ2TJ8g?si=0fpzsESVkgPvc8w1"
        },
        {
          id: 4,
          title: "How to ACTUALLY Lose Weight For Good (Science-Backed!) ",
          description: "Watch This Before You Lose Weight",
          thumbnail: "https://i.ytimg.com/vi/j4Yb5sWXFOE/hq720.jpg?sqp=-…BACGAY4AUAB&rs=AOn4CLB-E8pFXKyIkTDQY8JdHZpUlEPjzw",
          duration: "27:27",
          category: "diet",
          views: "3.5m",
          type: "iframe",
          src: "https://www.youtube.com/embed/j4Yb5sWXFOE?si=sO4YhwRlyNkYTMBc"
        },
        {
          id: 5,
          title: "Pamela's Triad: Endorphins + Best HIIT + Standing Ab HIIT",
          description: "just do it",
          thumbnail: "/image/lose/pamela.webp",
          duration: "33:04",
          category: "workout",
          views: "11.17m",
          type: "iframe",
          src: "//player.bilibili.com/player.html?isOutside=true&aid=353908467&bvid=BV14X4y1d73w&cid=1065023638&p=1"
        },
        {
          id: 6,
          title: "Eleni Fit-30-minute full-body standing aerobic workout for slimming your belly and thighs, no jumping or repetition",
          description: "This is a highly effective standing abdominal and thigh workout. Remember to engage your muscles while performing each movement for maximum effectiveness! 💪",
          thumbnail: "/image/lose/3.webp",
          duration: "34:57",
          category: "cardio",
          views: "50.8K",
          type: "iframe",
          src: "//player.bilibili.com/player.html?isOutside=true&aid=115424293356601&bvid=BV1kts5zoErK&cid=33329450692&p=1"
        },
        {
          id: 7,
          title: "Pamela-10-Minute Sweat-Air | Endorphin Boost: Joyful High-Energy Aerobic Dance Steps (Official Pamela Reif)",
          description: "No motivation?  Start your workout videos and let your body sweat it out with cardio! Let our bodies release endorphins ♥ Let happiness energy drive away your stress and bad moods:)",
          thumbnail: "/image/lose/4.webp",
          duration: "11:27",
          category: "cardio",
          views: "57.79m",
          type: "iframe",
          src: "//player.bilibili.com/player.html?isOutside=true&aid=426671393&bvid=BV1R3411A7g4&cid=723652151&p=1"

        },
        {
          id: 8,
          title: "30-minute intense cardio to burn fat and sweat like crazy! No running or jumping needed – just one session to get your whole body toned and fat-burning action!",
          description: "Start your day with a 30-minute HIIT workout that burns fat through intense sweating while standing still. 30 minutes is the ideal duration for aerobic training. This workout routine, divided into two parts (including warm-up and stretching), is now available. 💕 Jumping on an empty stomach in the morning will boost fat-burning effects! 🔥",
          thumbnail:  "/image/lose/5.webp",
          duration: "36:23",
          category: "cardio",
          views: "930.5K",
          type: "iframe",
          src: "//player.bilibili.com/player.html?isOutside=true&aid=1302226158&bvid=BV1eu4m1T7sf&cid=1479324399&p=1"
        },
        {
          id: 9,
          title: "Pamela's 1000 Steps + 2000 Steps + Endorphin-Fueled Sweat Collection [For Personal Use]",
          description: "I've combined three of my favorite, upbeat, and dance-worthy videos—Pamela 1000 Steps, Pamela 2000 Steps, and Endorphin—to make it easier to work out.",
          thumbnail: "/image/lose/6.webp",
          duration: "42:27",
          category: "workout",
          views: "430K",
          type: "iframe",
          src: "//player.bilibili.com/player.html?isOutside=true&aid=114336559274285&bvid=BV1E7oEYYEYh&cid=29414000431&p=1"
         
        },
        {
          id: 10,
          title: "What happens when you swap 50kg for 100kg of food for a week?",
          description: "Are you curious how much weight you'd lose if you swapped diets with a fat guy?",
          thumbnail: "/image/lose/7.webp",
          duration: "14:04",
          category: "diet",
          views: "10.19m",
          type: "iframe",
          src: "//player.bilibili.com/player.html?isOutside=true&aid=599172223&bvid=BV1ZB4y1r79G&cid=796327119&p=1"
        },
      ],
    };
  },
  computed: {
    filteredVideos() {
      if (this.activeCategory === "all") {
        return this.videos.slice(0, this.displayedVideos);
      }
      return this.videos
        .filter(video => video.category === this.activeCategory)
        .slice(0, this.displayedVideos);
    },
    hasMoreVideos() {
      return this.displayedVideos < this.totalVideos;
    },
  },
  methods: {
    loadMoreVideos() {
      this.displayedVideos += 4;
    },
    openVideo(video) {
      this.selectedVideo = video;
      document.body.style.overflow = 'hidden';
    },
    closeVideo() {
      this.selectedVideo = null;
      document.body.style.overflow = '';
    },
  },
  beforeUnmount() {
    document.body.style.overflow = '';
  },
};
</script>

<style scoped>
.video-page {
  min-height: calc(100vh - 120px);
  background: linear-gradient(135deg, #f9fafb 0%, #e5e7eb 100%);
  padding: 3rem 0;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Page Header */
.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-title {
  font-size: 3rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #70e0c0 0%, #4abad6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-subtitle {
  font-size: 1.125rem;
  color: #6b7280;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.7;
}

/* Category Filters */
.video-filters {
  margin-bottom: 2.5rem;
}

.filter-tabs {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.filter-tab {
  padding: 0.75rem 1.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 50px;
  background: white;
  color: #4b5563;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
}

.filter-tab:hover {
  border-color: #70e0c0;
  color: #70e0c0;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(112, 224, 192, 0.2);
}

.filter-tab.active {
  background: #70e0c0;
  border-color: #70e0c0;
  color: white;
  box-shadow: 0 4px 15px rgba(112, 224, 192, 0.3);
}

/* Video Grid */
.video-list-section {
  margin-bottom: 3rem;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.video-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;
}

.video-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
}

.video-thumbnail {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: #f3f4f6;
}

.thumbnail-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.video-card:hover .thumbnail-image {
  transform: scale(1.1);
}

.video-duration {
  position: absolute;
  bottom: 12px;
  right: 12px;
  background: rgba(0, 0, 0, 0.85);
  color: white;
  padding: 5px 10px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
}

.play-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(112, 224, 192, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.video-card:hover .play-overlay {
  opacity: 1;
}

.play-icon {
  font-size: 3.5rem;
  color: white;
  text-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
}

.video-info {
  padding: 1.5rem;
}

.video-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.3s ease;
}

.video-card:hover .video-title {
  color: #70e0c0;
}

.video-description {
  color: #6b7280;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.video-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  color: #9ca3af;
}

.video-category {
  background: #f3f4f6;
  padding: 5px 12px;
  border-radius: 20px;
  font-weight: 600;
  text-transform: capitalize;
}

/* Load More Button */
.load-more-section {
  text-align: center;
  margin-top: 3rem;
}

.load-more-btn {
  padding: 1rem 2.5rem;
  background: linear-gradient(135deg, #70e0c0 0%, #4abad6 100%);
  color: white;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(112, 224, 192, 0.3);
}

.load-more-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(112, 224, 192, 0.4);
}

/* Video Modal */
.video-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  backdrop-filter: blur(4px);
}

.modal-content {
  background: white;
  border-radius: 20px;
  max-width: 1000px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
}

.close-btn {
  width: 40px;
  height: 40px;
  border: none;
  background: #f3f4f6;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.5rem;
  color: #6b7280;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: #70e0c0;
  color: white;
}

.modal-video {
  aspect-ratio: 16 / 9;
  background: #000;
}

.modal-video iframe,
.modal-video video {
  width: 100%;
  height: 80%;
  border: none;
}

.modal-info {
  padding: 1.5rem;
}

.modal-description {
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.modal-meta {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  font-size: 0.9rem;
  color: #6b7280;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.meta-category {
  background: rgba(112, 224, 192, 0.15);
  color: #70e0c0;
  padding: 6px 14px;
  border-radius: 20px;
  font-weight: 600;
  text-transform: capitalize;
}

/* Modal Notes */
.modal-notes {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
}

.notes-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.75rem;
}

.notes-content {
  height: 200px;
  color: #4b5563;
  line-height: 1.6;
  white-space: pre-line;
  background: #f9fafb;
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid #70e0c0;
  overflow: hidden;
  overflow-y:auto;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .video-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .page-subtitle {
    font-size: 1rem;
  }

  .filter-tabs {
    gap: 0.75rem;
  }

  .filter-tab {
    padding: 0.6rem 1.25rem;
    font-size: 0.9rem;
  }

  .video-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .video-thumbnail {
    height: 220px;
  }

  .video-modal {
    padding: 1rem;
  }

  .modal-title {
    font-size: 1.2rem;
  }

  .modal-info {
    padding: 1rem;
  }

  .modal-meta {
    flex-wrap: wrap;
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .video-page {
    padding: 1.5rem 0;
  }

  .page-title {
    font-size: 1.75rem;
  }

  .page-subtitle {
    font-size: 0.95rem;
  }

  .video-info {
    padding: 1.25rem;
  }

  .video-title {
    font-size: 1rem;
  }

  .load-more-btn {
    padding: 0.875rem 2rem;
    font-size: 0.95rem;
  }
}
</style>
