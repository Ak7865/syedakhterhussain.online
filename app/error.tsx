"use client";

import { useEffect } from "react";

export default function Error({
  error,
    reset,
    }: {
      error: Error & { digest?: string };
        reset: () => void;
        }) {
          useEffect(() => {
              console.error(error);
                }, [error]);

                  return (
                      <main
                            style={{
                                    minHeight: "100vh",
                                            padding: "40px 20px",
                                                    background: "#0d1117",
                                                            color: "#fff",
                                                                    fontFamily: "monospace",
                                                                          }}
                                                                              >
                                                                                    <h1 style={{ color: "#ff6b6b" }}>
                                                                                            Client Error
                                                                                                  </h1>

                                                                                                        <pre
                                                                                                                style={{
                                                                                                                          whiteSpace: "pre-wrap",
                                                                                                                                    wordBreak: "break-word",
                                                                                                                                              background: "#161b22",
                                                                                                                                                        padding: "20px",
                                                                                                                                                                  borderRadius: "10px",
                                                                                                                                                                            overflowX: "auto",
                                                                                                                                                                                    }}
                                                                                                                                                                                          >
                                                                                                                                                                                                  {error.message}
                                                                                                                                                                                                          {"\n\n"}
                                                                                                                                                                                                                  {error.stack}
                                                                                                                                                                                                                        </pre>

                                                                                                                                                                                                                              <button
                                                                                                                                                                                                                                      onClick={() => reset()}
                                                                                                                                                                                                                                              style={{
                                                                                                                                                                                                                                                        marginTop: "20px",
                                                                                                                                                                                                                                                                  padding: "12px 20px",
                                                                                                                                                                                                                                                                            borderRadius: "8px",
                                                                                                                                                                                                                                                                                      border: "none",
                                                                                                                                                                                                                                                                                                cursor: "pointer",
                                                                                                                                                                                                                                                                                                        }}
                                                                                                                                                                                                                                                                                                              >
                                                                                                                                                                                                                                                                                                                      Try Again
                                                                                                                                                                                                                                                                                                                            </button>
                                                                                                                                                                                                                                                                                                                                </main>
                                                                                                                                                                                                                                                                                                                                  );
                                                                                                                                                                                                                                                                                                                                  }