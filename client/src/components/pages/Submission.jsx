// import React, { useState, useRef, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Upload, Camera, Video, FileImage, X, CheckCircle, AlertTriangle, Clock, Info } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext';
// import api from '../../services/api';
// import toast from 'react-hot-toast';
// import Header from '../../components/common/Header';

// const Submission = () => {
//   const { challengeId } = useParams();
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadComplete, setUploadComplete] = useState(false);
//   const [dragActive, setDragActive] = useState(false);
//   const [challenge, setChallenge] = useState(null);
//   const [submissionResult, setSubmissionResult] = useState(null);
//   const fileInputRef = useRef(null);

//   useEffect(() => {
//     fetchChallenge();
//     checkExistingSubmission();
//   }, [challengeId]);

//   const fetchChallenge = async () => {
//     try {
//       const response = await api.get('/challenges/current');
//       if (response.data._id === challengeId) {
//         setChallenge(response.data);
//       } else {
//         toast.error('Challenge not found or not active');
//         navigate('/home');
//       }
//     } catch (error) {
//       toast.error('Failed to load challenge');
//       navigate('/home');
//     }
//   };

//   const checkExistingSubmission = async () => {
//     try {
//       const response = await api.get(`/submissions/check/${challengeId}`);
//       if (response.data.submitted) {
//         toast.info('You have already submitted to this challenge');
//         navigate('/home');
//       }
//     } catch (error) {
//       console.error('Error checking submission:', error);
//     }
//   };

//   const handleDrag = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === "dragenter" || e.type === "dragover") {
//       setDragActive(true);
//     } else if (e.type === "dragleave") {
//       setDragActive(false);
//     }
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);
    
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       handleFileSelect(e.dataTransfer.files[0]);
//     }
//   };

//   const handleFileSelect = (file) => {
//     // Validate file type
//     const validTypes = ['image/png', 'video/mp4'];
//     if (!validTypes.includes(file.type)) {
//       toast.error('Please select a PNG image or MP4 video file.');
//       return;
//     }

//     // Validate file size (10MB)
//     if (file.size > 10 * 1024 * 1024) {
//       toast.error('File size must be less than 10MB.');
//       return;
//     }

//     setSelectedFile(file);
//   };

//   const handleFileInputChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       handleFileSelect(e.target.files[0]);
//     }
//   };

//   const removeFile = () => {
//     setSelectedFile(null);
//     setUploadProgress(0);
//     setUploadComplete(false);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };

//   const handleSubmit = async () => {
//     if (!selectedFile) {
//       toast.error('Please select a file to upload.');
//       return;
//     }

//     try {
//       setIsUploading(true);
//       setUploadProgress(0);

//       const formData = new FormData();
//       formData.append('file', selectedFile);
//       formData.append('challengeId', challengeId);

//       // Simulate progress
//       const progressInterval = setInterval(() => {
//         setUploadProgress(prev => {
//           if (prev >= 90) {
//             clearInterval(progressInterval);
//             return prev;
//           }
//           return prev + Math.random() * 10;
//         });
//       }, 200);

//       const response = await api.post('/submissions', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//         onUploadProgress: (progressEvent) => {
//           const percentCompleted = Math.round(
//             (progressEvent.loaded * 100) / progressEvent.total
//           );
//           setUploadProgress(percentCompleted);
//         },
//       });

//       clearInterval(progressInterval);
//       setUploadProgress(100);
//       setIsUploading(false);
//       setUploadComplete(true);
//       setSubmissionResult(response.data);
      
//       toast.success(`Submission successful! You scored ${response.data.score} points!`);
//     } catch (error) {
//       setIsUploading(false);
//       setUploadProgress(0);
//       toast.error(error.response?.data?.message || 'Upload failed');
//     }
//   };

//   const formatFileSize = (bytes) => {
//     if (bytes === 0) return '0 Bytes';
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//   };

//   const getFileIcon = (fileType) => {
//     if (fileType.startsWith('image/')) {
//       return <FileImage className="w-8 h-8 text-blue-500" />;
//     } else if (fileType.startsWith('video/')) {
//       return <Video className="w-8 h-8 text-purple-500" />;
//     }
//     return <FileImage className="w-8 h-8 text-gray-500" />;
//   };

//   const formatTimeRemaining = (endTime) => {
//     const now = new Date();
//     const end = new Date(endTime);
//     const diff = end - now;
    
//     if (diff <= 0) return '0h 0m';
    
//     const hours = Math.floor(diff / (1000 * 60 * 60));
//     const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
//     return `${hours}h ${minutes}m`;
//   };

//   if (uploadComplete && submissionResult) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
//         <Header />
//         <div className="container mx-auto px-6 py-8">
//           <div className="max-w-md w-full mx-auto">
//             <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
//               <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
//                 <CheckCircle className="w-8 h-8 text-green-600" />
//               </div>
//               <h2 className="text-2xl font-bold text-gray-800 mb-4">Submission Complete!</h2>
//               <p className="text-gray-600 mb-6">
//                 Your {selectedFile?.type.startsWith('image/') ? 'photo' : 'video'} has been successfully submitted to the challenge.
//               </p>
//               <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
//                 <p className="text-green-800 font-medium">Score: {submissionResult.score} points</p>
//                 <p className="text-green-600 text-sm">You can check your ranking on the leaderboard.</p>
//               </div>
//               <div className="space-y-3">
//                 <button 
//                   onClick={() => navigate('/leaderboard')}
//                   className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
//                 >
//                   View Leaderboard
//                 </button>
//                 <button 
//                   onClick={() => navigate('/home')}
//                   className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all"
//                 >
//                   Back to Home
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!challenge) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
//         <Header />
//         <div className="flex items-center justify-center h-96">
//           <div className="text-center">
//             <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//             <p className="text-gray-600">Loading challenge...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
//       <Header />

//       <div className="container mx-auto px-6 py-8">
//         <div className="max-w-4xl mx-auto">
//           {/* Page Header */}
//           <div className="text-center mb-8">
//             <h1 className="text-4xl font-bold text-gray-800 mb-4">Submit Your Proof</h1>
//             <p className="text-xl text-gray-600">{challenge.title}</p>
//             <div className="flex items-center justify-center space-x-2 mt-4 text-amber-600">
//               <Clock className="w-5 h-5" />
//               <span className="font-semibold">{formatTimeRemaining(challenge.endTime)} remaining</span>
//             </div>
//           </div>

//           <div className="grid lg:grid-cols-3 gap-8">
//             {/* Upload Section */}
//             <div className="lg:col-span-2">
//               <div className="bg-white rounded-2xl shadow-lg p-6">
//                 <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload Your File</h2>

//                 {/* Upload Area */}
//                 <div 
//                   className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
//                     dragActive 
//                       ? 'border-purple-400 bg-purple-50' 
//                       : selectedFile 
//                         ? 'border-green-400 bg-green-50' 
//                         : 'border-gray-300 hover:border-purple-400 hover:bg-purple-50'
//                   }`}
//                   onDragEnter={handleDrag}
//                   onDragLeave={handleDrag}
//                   onDragOver={handleDrag}
//                   onDrop={handleDrop}
//                 >
//                   <input
//                     ref={fileInputRef}
//                     type="file"
//                     className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                     accept=".png,.mp4"
//                     onChange={handleFileInputChange}
//                     disabled={isUploading}
//                   />

//                   {!selectedFile ? (
//                     <div>
//                       <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                       <h3 className="text-lg font-semibold text-gray-700 mb-2">
//                         Drop your file here or click to browse
//                       </h3>
//                       <p className="text-gray-500 mb-4">PNG images or MP4 videos only</p>
//                       <button 
//                         type="button"
//                         className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
//                         onClick={() => fileInputRef.current?.click()}
//                       >
//                         Choose File
//                       </button>
//                     </div>
//                   ) : (
//                     <div>
//                       <div className="flex items-center justify-center space-x-3 mb-4">
//                         {getFileIcon(selectedFile.type)}
//                         <div className="text-left">
//                           <p className="font-semibold text-gray-800">{selectedFile.name}</p>
//                           <p className="text-sm text-gray-500">{formatFileSize(selectedFile.size)}</p>
//                         </div>
//                         <button
//                           onClick={removeFile}
//                           className="text-red-500 hover:text-red-700 transition-colors"
//                           disabled={isUploading}
//                         >
//                           <X className="w-5 h-5" />
//                         </button>
//                       </div>

//                       {/* Upload Progress */}
//                       {isUploading && (
//                         <div className="mb-4">
//                           <div className="bg-gray-200 rounded-full h-2 mb-2">
//                             <div 
//                               className="bg-purple-600 h-2 rounded-full transition-all duration-300"
//                               style={{ width: `${uploadProgress}%` }}
//                             ></div>
//                           </div>
//                           <p className="text-sm text-gray-600">Uploading... {Math.round(uploadProgress)}%</p>
//                         </div>
//                       )}

//                       {/* Preview */}
//                       {selectedFile.type.startsWith('image/') && (
//                         <div className="mt-4">
//                           <img 
//                             src={URL.createObjectURL(selectedFile)} 
//                             alt="Preview" 
//                             className="max-w-full max-h-48 mx-auto rounded-lg shadow-md"
//                           />
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>

//                 {/* Submit Button */}
//                 <div className="mt-6">
//                   <button
//                     onClick={handleSubmit}
//                     disabled={!selectedFile || isUploading}
//                     className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
//                       selectedFile && !isUploading
//                         ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-lg transform hover:scale-[1.02]'
//                         : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                     }`}
//                   >
//                     {isUploading ? 'Uploading...' : 'Submit Proof'}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Sidebar */}
//             <div className="space-y-6">
//               {/* Challenge Rules */}
//               <div className="bg-white rounded-2xl shadow-lg p-6">
//                 <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
//                   <Info className="w-5 h-5 text-blue-500" />
//                   <span>Challenge Rules</span>
//                 </h3>
//                 <div className="space-y-3">
//                   {challenge.rules?.map((rule, index) => (
//                     <div key={index} className="flex items-start space-x-3">
//                       <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
//                         <span className="text-xs font-semibold text-purple-600">{index + 1}</span>
//                       </div>
//                       <span className="text-gray-700 text-sm">{rule}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* File Requirements */}
//               <div className="bg-white rounded-2xl shadow-lg p-6">
//                 <h3 className="text-xl font-bold text-gray-800 mb-4">File Requirements</h3>
//                 <div className="space-y-4">
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-600">Accepted Formats</span>
//                     <div className="flex space-x-2">
//                       <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded text-xs font-medium">
//                         PNG
//                       </span>
//                       <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded text-xs font-medium">
//                         MP4
//                       </span>
//                     </div>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-600">Max File Size</span>
//                     <span className="font-semibold text-gray-800">10MB</span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-600">Time Remaining</span>
//                     <span className="font-semibold text-amber-600">
//                       {formatTimeRemaining(challenge.endTime)}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* Tips */}
//               <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
//                 <h3 className="text-lg font-bold mb-4">💡 Pro Tips</h3>
//                 <div className="space-y-3 text-sm">
//                   <p>• Submit early to earn bonus points for speed</p>
//                   <p>• Make sure your photo/video clearly shows the challenge subject</p>
//                   <p>• Natural lighting often works better than flash</p>
//                   <p>• Double-check that your submission follows all rules</p>
//                 </div>
//               </div>

//               {/* Warning */}
//               <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
//                 <div className="flex items-start space-x-3">
//                   <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
//                   <div>
//                     <h4 className="font-semibold text-amber-800 mb-1">Important</h4>
//                     <p className="text-sm text-amber-700">
//                       Once submitted, you cannot change your entry. Make sure you're happy with your submission before clicking submit.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Submission;

import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Upload, Camera, Video, FileImage, X, CheckCircle, AlertTriangle, Clock, Info } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import toast from 'react-hot-toast';
import Header from '../../components/common/Header';

const Submission = () => {
  const { challengeId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [challenge, setChallenge] = useState(null);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (challengeId) {
      fetchChallenge();
      checkExistingSubmission();
    }
  }, [challengeId]);

  // FIXED: Get challenge by specific ID instead of using /current
  const fetchChallenge = async () => {
    try {
      setLoading(true);
      console.log('Fetching challenge with ID:', challengeId);
      
      // Use the specific challenge ID endpoint
      const response = await api.get(`/challenges/${challengeId}`);
      console.log('Challenge fetched:', response.data);
      
      setChallenge(response.data);
      
      // Check if challenge is still active
      if (response.data.status !== 'active') {
        toast.error('This challenge is no longer active');
        navigate('/home');
        return;
      }
      
      // Check if challenge has ended
      if (new Date(response.data.endTime) <= new Date()) {
        toast.error('This challenge has ended');
        navigate('/home');
        return;
      }
      
    } catch (error) {
      console.error('Error fetching challenge:', error);
      if (error.response?.status === 404) {
        toast.error('Challenge not found');
      } else {
        toast.error('Failed to load challenge');
      }
      navigate('/home');
    } finally {
      setLoading(false);
    }
  };

  const checkExistingSubmission = async () => {
    try {
      console.log('Checking existing submission for challenge:', challengeId);
      const response = await api.get(`/submissions/check/${challengeId}`);
      console.log('Submission check result:', response.data);
      
      if (response.data.submitted) {
        toast.info('You have already submitted to this challenge');
        navigate('/home');
      }
    } catch (error) {
      console.error('Error checking submission:', error);
      // Don't redirect on error, just log it
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (file) => {
    // Validate file type
    const validTypes = ['image/png', 'video/mp4'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please select a PNG image or MP4 video file.');
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB.');
      return;
    }

    setSelectedFile(file);
    console.log('File selected:', file.name, file.type, file.size);
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setUploadProgress(0);
    setUploadComplete(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      toast.error('Please select a file to upload.');
      return;
    }

    if (!challenge) {
      toast.error('Challenge data not available.');
      return;
    }

    try {
      setIsUploading(true);
      setUploadProgress(0);
      console.log('Starting submission for challenge:', challengeId);

      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('challengeId', challengeId);

      console.log('FormData created:', {
        fileName: selectedFile.name,
        fileSize: selectedFile.size,
        challengeId: challengeId
      });

      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + Math.random() * 10;
        });
      }, 200);

      const response = await api.post('/submissions', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      });

      console.log('Submission response:', response.data);

      clearInterval(progressInterval);
      setUploadProgress(100);
      setIsUploading(false);
      setUploadComplete(true);
      setSubmissionResult(response.data);
      
      toast.success(`Submission successful! You scored ${response.data.score} points!`);
    } catch (error) {
      console.error('Submission error:', error);
      setIsUploading(false);
      setUploadProgress(0);
      
      const errorMessage = error.response?.data?.message || 'Upload failed';
      toast.error(errorMessage);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType) => {
    if (fileType.startsWith('image/')) {
      return <FileImage className="w-8 h-8 text-blue-500" />;
    } else if (fileType.startsWith('video/')) {
      return <Video className="w-8 h-8 text-purple-500" />;
    }
    return <FileImage className="w-8 h-8 text-gray-500" />;
  };

  const formatTimeRemaining = (endTime) => {
    const now = new Date();
    const end = new Date(endTime);
    const diff = end - now;
    
    if (diff <= 0) return '0h 0m';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading challenge...</p>
          </div>
        </div>
      </div>
    );
  }

  // Success state
  if (uploadComplete && submissionResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <Header />
        <div className="container mx-auto px-6 py-8">
          <div className="max-w-md w-full mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Submission Complete!</h2>
              <p className="text-gray-600 mb-6">
                Your {selectedFile?.type.startsWith('image/') ? 'photo' : 'video'} has been successfully submitted to the challenge.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-green-800 font-medium">Score: {submissionResult.score} points</p>
                <p className="text-green-600 text-sm">You can check your ranking on the leaderboard.</p>
              </div>
              <div className="space-y-3">
                <button 
                  onClick={() => navigate('/leaderboard')}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  View Leaderboard
                </button>
                <button 
                  onClick={() => navigate('/home')}
                  className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state - challenge not found
  if (!challenge) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <Header />
        <div className="container mx-auto px-6 py-8">
          <div className="text-center py-20">
            <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Challenge Not Found</h2>
            <p className="text-gray-600 mb-8">The challenge you're looking for doesn't exist or is no longer active.</p>
            <button 
              onClick={() => navigate('/home')}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Submit Your Proof</h1>
            <p className="text-xl text-gray-600">{challenge.title}</p>
            <div className="flex items-center justify-center space-x-2 mt-4 text-amber-600">
              <Clock className="w-5 h-5" />
              <span className="font-semibold">{formatTimeRemaining(challenge.endTime)} remaining</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Upload Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload Your File</h2>

                {/* Upload Area */}
                <div 
                  className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                    dragActive 
                      ? 'border-purple-400 bg-purple-50' 
                      : selectedFile 
                        ? 'border-green-400 bg-green-50' 
                        : 'border-gray-300 hover:border-purple-400 hover:bg-purple-50'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept=".png,.mp4"
                    onChange={handleFileInputChange}
                    disabled={isUploading}
                  />

                  {!selectedFile ? (
                    <div>
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">
                        Drop your file here or click to browse
                      </h3>
                      <p className="text-gray-500 mb-4">PNG images or MP4 videos only</p>
                      <button 
                        type="button"
                        className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Choose File
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center justify-center space-x-3 mb-4">
                        {getFileIcon(selectedFile.type)}
                        <div className="text-left">
                          <p className="font-semibold text-gray-800">{selectedFile.name}</p>
                          <p className="text-sm text-gray-500">{formatFileSize(selectedFile.size)}</p>
                        </div>
                        <button
                          onClick={removeFile}
                          className="text-red-500 hover:text-red-700 transition-colors"
                          disabled={isUploading}
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Upload Progress */}
                      {isUploading && (
                        <div className="mb-4">
                          <div className="bg-gray-200 rounded-full h-2 mb-2">
                            <div 
                              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${uploadProgress}%` }}
                            ></div>
                          </div>
                          <p className="text-sm text-gray-600">Uploading... {Math.round(uploadProgress)}%</p>
                        </div>
                      )}

                      {/* Preview */}
                      {selectedFile.type.startsWith('image/') && (
                        <div className="mt-4">
                          <img 
                            src={URL.createObjectURL(selectedFile)} 
                            alt="Preview" 
                            className="max-w-full max-h-48 mx-auto rounded-lg shadow-md"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="mt-6">
                  <button
                    onClick={handleSubmit}
                    disabled={!selectedFile || isUploading}
                    className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
                      selectedFile && !isUploading
                        ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-lg transform hover:scale-[1.02]'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {isUploading ? 'Uploading...' : 'Submit Proof'}
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Challenge Rules */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                  <Info className="w-5 h-5 text-blue-500" />
                  <span>Challenge Rules</span>
                </h3>
                <div className="space-y-3">
                  {challenge.rules?.map((rule, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-semibold text-purple-600">{index + 1}</span>
                      </div>
                      <span className="text-gray-700 text-sm">{rule}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* File Requirements */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">File Requirements</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Accepted Formats</span>
                    <div className="flex space-x-2">
                      <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded text-xs font-medium">
                        PNG
                      </span>
                      <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded text-xs font-medium">
                        MP4
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Max File Size</span>
                    <span className="font-semibold text-gray-800">10MB</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Time Remaining</span>
                    <span className="font-semibold text-amber-600">
                      {formatTimeRemaining(challenge.endTime)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
                <h3 className="text-lg font-bold mb-4">💡 Pro Tips</h3>
                <div className="space-y-3 text-sm">
                  <p>• Submit early to earn bonus points for speed</p>
                  <p>• Make sure your photo/video clearly shows the challenge subject</p>
                  <p>• Natural lighting often works better than flash</p>
                  <p>• Double-check that your submission follows all rules</p>
                </div>
              </div>

              {/* Warning */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-amber-800 mb-1">Important</h4>
                    <p className="text-sm text-amber-700">
                      Once submitted, you cannot change your entry. Make sure you're happy with your submission before clicking submit.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Submission;