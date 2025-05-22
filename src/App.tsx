import React, { useState, useRef } from 'react';
import { Mic, Square, Play, Linkedin, FileText, Briefcase, Building2, GraduationCap } from 'lucide-react';

function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      audioChunks.current = [];

      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
      };

      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Professional Profile</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Frontend Developer & Technical Lead</h2>
                  <p className="text-gray-600">Halo Media LLC</p>
                </div>
              </div>

              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  With a professional career of over 10 years, I have specialized in frontend development and technical leadership of innovative projects. Currently, I serve as a Frontend Web Developer at Halo Media LLC, where my mission is to design and implement robust and scalable solutions that enhance the user experience in the construction industry.
                </p>
              </div>
            </section>

            {/* Experience Section */}
            <section className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Briefcase className="w-5 h-5 mr-2" />
                Current Role
              </h3>
              <div className="border-l-2 border-blue-500 pl-4">
                <h4 className="font-medium text-gray-900">Technical Lead & Frontend Developer</h4>
                <p className="text-gray-600 text-sm">Halo Media LLC • 2023 - Present</p>
                <ul className="mt-2 text-gray-700 list-disc list-inside">
                  <li>Leading the technical development of the ticketing portfolio</li>
                  <li>Implementing solutions using Next.js, React, Nest.js, and Docker</li>
                  <li>Creating Progressive Web Apps (PWAs) for enhanced user experience</li>
                  <li>Managing team organization and deployment across environments</li>
                </ul>
              </div>
            </section>
          </div>

          {/* Audio Recording Section */}
          <div className="lg:col-span-1">
            <section className="bg-white rounded-lg shadow p-6 sticky top-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Audio Introduction</h3>
              <div className="space-y-4">
                <div className="flex justify-center">
                  {isRecording ? (
                    <button
                      onClick={stopRecording}
                      className="bg-red-500 text-white p-4 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <Square className="w-6 h-6" />
                    </button>
                  ) : (
                    <button
                      onClick={startRecording}
                      className="bg-blue-500 text-white p-4 rounded-full hover:bg-blue-600 transition-colors"
                    >
                      <Mic className="w-6 h-6" />
                    </button>
                  )}
                </div>
                
                {audioURL && (
                  <div className="mt-4">
                    <audio controls className="w-full" src={audioURL}>
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                )}
                
                <div className="text-sm text-gray-600 text-center mt-2">
                  {isRecording ? 'Recording in progress...' : 'Click to record your introduction'}
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Linkedin className="w-5 h-5 mr-2" />
                  LinkedIn Profile
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Download CV
                </a>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;