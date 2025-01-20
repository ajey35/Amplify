const CenterLoader = () => {
    return (
      <div className="flex flex-col w-full h-screen">
        {/* Header Section */}
        <div className="sticky top-0 z-50 bg-black bg-opacity-0">
          <div className="absolute right-5 top-5">
            <div className="flex items-center rounded-full space-x-3 p-1 pr-2 bg-gray-800/50">
              {/* Profile Image Skeleton */}
              <div className="h-12 w-12 rounded-full bg-gray-600 animate-pulse" />
              {/* Name Skeleton */}
              <div className="h-4 w-24 bg-gray-600 rounded animate-pulse" />
              {/* Icon Skeleton */}
              <div className="h-5 w-5 bg-gray-600 rounded animate-pulse" />
            </div>
          </div>
        </div>
  
        <div className="overflow-y-scroll h-screen scrollbar-hide">
          {/* Hero Section */}
          <section className="flex items-end space-x-7 bg-gradient-to-b from-gray-800 to-black h-80 text-white p-8">
            {/* Playlist Image Skeleton */}
            <div className="h-44 w-44 bg-gray-700 animate-pulse" />
            
            <div className="space-y-4">
              {/* Playlist Text Skeleton */}
              <div className="h-3 w-16 bg-gray-600 rounded animate-pulse" />
              {/* Playlist Name Skeleton */}
              <div className="h-8 w-48 bg-gray-600 rounded animate-pulse" />
            </div>
          </section>
  
          {/* Songs Section */}
          <div className="mt-5 px-8">
            {/* Song Items */}
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="grid grid-cols-2 md:grid-cols-3 text-gray-500 px-5 py-4 hover:bg-gray-900 rounded-lg mb-2"
              >
                <div className="flex items-center space-x-4">
                  {/* Song Number */}
                  <div className="h-4 w-4 bg-gray-600 rounded animate-pulse" />
                  {/* Song Image */}
                  <div className="h-10 w-10 bg-gray-600 rounded animate-pulse" />
                  {/* Song Title */}
                  <div className="h-4 w-32 bg-gray-600 rounded animate-pulse" />
                </div>
                {/* Album Name */}
                <div className="hidden md:inline h-4 w-24 bg-gray-600 rounded animate-pulse self-center justify-self-center" />
                {/* Duration */}
                <div className="h-4 w-12 bg-gray-600 rounded animate-pulse justify-self-end self-center" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default CenterLoader;