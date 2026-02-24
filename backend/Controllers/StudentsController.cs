using Microsoft.AspNetCore.Mvc;
using StudentApi.Models;
using System.Collections.Generic;
using System.Linq;


namespace StudentApi.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class StudentsController : ControllerBase
	{
		private static List<Student> students = new List<Student>();
		[HttpGet]
		public List<Student> GetStudents()
		{
			return students;
		}


		[HttpPost]
		public Student AddStudent(Student student)
		{
			student.Id = students.Count == 0 ? 1 : students.Max(s => s.Id) + 1;
			students.Add(student);
			return student;
		}


		[HttpDelete("{id}")]
		public IActionResult DeleteStudent(int id)
		{
			var student = students.FirstOrDefault(s => s.Id == id);
			if (student == null) return NotFound();
			students.Remove(student);
			return Ok();
		}
	}
}
