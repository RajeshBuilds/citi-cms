"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle } from "lucide-react"

// Form validation schema
const complaintFormSchema = z.object({
  accountNumber: z.string().min(1, "Account number is required"),
  cardNumber: z.string().optional(),
  complaintType: z.enum([
    "credit_card_issue",
    "unauthorized_transaction", 
    "billing_dispute",
    "fraud",
    "service_quality",
    "technical_issue",
    "other"
  ], {
    message: "Please select a complaint type",
  }),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  contactPhone: z.string().min(10, "Please enter a valid phone number"),
  preferredContact: z.enum(["phone", "email"], {
    message: "Please select preferred contact method",
  }),
  urgency: z.enum(["low", "medium", "high"], {
    message: "Please select urgency level",
  }),
})

type ComplaintFormData = z.infer<typeof complaintFormSchema>

const complaintTypes = [
  { value: "credit_card_issue", label: "Credit Card Issue" },
  { value: "unauthorized_transaction", label: "Unauthorized Transaction" },
  { value: "billing_dispute", label: "Billing Dispute" },
  { value: "fraud", label: "Fraud" },
  { value: "service_quality", label: "Service Quality" },
  { value: "technical_issue", label: "Technical Issue" },
  { value: "other", label: "Other" },
]

const urgencyLevels = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
]

export function ComplaintForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const form = useForm<ComplaintFormData>({
    resolver: zodResolver(complaintFormSchema),
    defaultValues: {
      accountNumber: "",
      cardNumber: "",
      complaintType: undefined,
      subject: "",
      description: "",
      contactPhone: "",
      preferredContact: undefined,
      urgency: undefined,
    },
  })

  async function onSubmit(data: ComplaintFormData) {
    setIsSubmitting(true)
    setSubmitStatus("idle")
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log("Complaint submitted:", data)
      setSubmitStatus("success")
      form.reset()
    } catch (error) {
      console.error("Error submitting complaint:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            File a Complaint
          </CardTitle>
          <CardDescription className="text-center">
            We&apos;re here to help resolve your banking concerns. Please provide the details below.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {submitStatus === "success" && (
            <Alert className="mb-6 border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Your complaint has been submitted successfully. We&apos;ll contact you within 24-48 hours.
              </AlertDescription>
            </Alert>
          )}

          {submitStatus === "error" && (
            <Alert className="mb-6 border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                There was an error submitting your complaint. Please try again.
              </AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Account Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Account Information</h3>
                
                <FormField
                  control={form.control}
                  name="accountNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Number *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your account number" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cardNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Number (if applicable)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Last 4 digits of your card" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Only enter the last 4 digits for security
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Complaint Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Complaint Details</h3>
                
                <FormField
                  control={form.control}
                  name="complaintType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type of Complaint *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select complaint type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {complaintTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Brief summary of your complaint" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Detailed Description *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Please provide detailed information about your complaint, including dates, amounts, and any relevant transaction details..."
                          className="min-h-[120px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Include specific details to help us resolve your issue faster
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="urgency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Urgency Level *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select urgency level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {urgencyLevels.map((level) => (
                            <SelectItem key={level.value} value={level.value}>
                              {level.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Contact Information</h3>
                
                <FormField
                  control={form.control}
                  name="contactPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your phone number" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="preferredContact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Contact Method *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select contact method" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="phone">Phone Call</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Complaint"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
} 